<?php

namespace App\Http\Services;

use App\Models\Customer;
use App\Models\ProductDetail;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartService
{
    public function create($request)
    {
        try {
            DB::beginTransaction();
            $auth = Auth::guard('customerApi')->user();
            $product = ProductDetail::whereHas('product', function ($query) {
                $query->where('status', config('constants.user.status.active'));
            })->where('qty', '>=', 1)
                ->find($request->id);
            if ($product) {
                if ($auth->cart) {
                    $auth->cart->products()->attach($product->id, ['qty' => $request->qty]);
                } else {
                    $cart = $auth->cart()->create();
                    $auth->update(['cart_id' => $cart->id]);
                    $cart->products()->attach($product->id, ['qty' => $request->qty]);
                }
                DB::commit();
                return response([
                    'message' => "$request->name" . ' added to cart successfully ',
                    'code' => Response::HTTP_OK
                ], Response::HTTP_OK);
            }
            return response([
                'message' => "$request->name" . ' is not avable',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'message' => "$request->name" . ' added to cart failed ',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function detail($request)
    {
        $user = Customer::with(
            'cart',
            'cart.products',
            'cart.products.propertyValue:attribute_value_name',
            'cart.products.product:id,name,image,expried,sale_type,price,sale_off'
        )->find(Auth::guard('customerApi')->user()->id);
        $cart = $user->cart ? $user->cart->products : [];
        return response([
            'cart' => $cart,
            'message' => 'success!',
            'code' => Response::HTTP_OK
        ], Response::HTTP_OK);
    }

    public function edit($request)
    {
        try {
            DB::beginTransaction();
            $auth = Auth::guard('customerApi')->user();
            $product = ProductDetail::whereHas('product', function ($query) {
                $query->where('status', config('constants.user.status.active'));
            })->where('qty', '>=', $request->qty)
                ->find($request->id);
            if ($product) {
                $auth->cart->products()->updateExistingPivot($product->id, ['qty' => $request->qty]);
                DB::commit();
                return response([
                    'message' => "$request->name" . ' added to cart successfully ',
                    'code' => Response::HTTP_OK
                ], Response::HTTP_OK);
            }
            return response([
                'message' => "$request->name" . ' is not avable',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'message' => "$request->name" . ' added to cart failed ',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function delete($id)
    {
        try {
            $auth = Auth::guard('customerApi')->user();
            $auth->cart->products()->detach($id);
            return response([
                'message' => 'success!',
                'code' => Response::HTTP_OK
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response([
                'message' => 'error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
