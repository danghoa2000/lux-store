<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\CustomerAddress;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    use AuthenticatesUsers;

    const ADDRESS_UNSELECTED = 0;
    const ADDRESS_SELECTED = 1;

    public function getAddress()
    {
        $user = Auth::guard('customerApi')->user();
        $address = $user->address;
        return response()->json([
            'code' => Response::HTTP_OK,
            'message' => 'success',
            'address' => $address
        ], Response::HTTP_OK);
    }

    public function storeAddress(Request $request)
    {
        $user = Auth::guard('customerApi')->user();
        CustomerAddress::create([
            'code' => $user->id,
            'full_name' => $request->fullName,
            'telephone' => $request->telephone,
            'province_id' => $request->province_id,
            'district_id' => $request->district_id,
            'commune_id' => $request->commune_id,
            'address' => $request->address,
            'status' => self::ADDRESS_UNSELECTED,
        ]);

        return response()->json([
            'code' => Response::HTTP_OK,
            'message' => 'success',
        ], Response::HTTP_OK);
    }

    public function updateAddress(Request $request)
    {
        $address = CustomerAddress::find($request->id);
        if ($address) {
            $address->update([
                'full_name' => $request->full_name,
                'telephone' => $request->telephone,
                'province_id' => $request->province_id,
                'district_id' => $request->district_id,
                'commune_id' => $request->commune_id,
                'address' => $request->address,
            ]);
            return response()->json([
                'code' => Response::HTTP_OK,
                'message' => 'success',
            ], Response::HTTP_OK);
        }

        return response([
            'message' => 'Update error!',
            'code' => Response::HTTP_NOT_FOUND
        ], Response::HTTP_OK);
    }

    public function updateAddressSelected(Request $request)
    {
        $address = CustomerAddress::find($request->id);
        if ($address) {
            try {
                DB::beginTransaction();
                CustomerAddress::where('code', Auth::guard('customerApi')->user()->id)
                    ->update(['status' => self::ADDRESS_UNSELECTED]);
                $address->update([
                    'status' => self::ADDRESS_SELECTED,
                ]);
                DB::commit();
                return response()->json([
                    'code' => Response::HTTP_OK,
                    'message' => 'success',
                ], Response::HTTP_OK);
            } catch (\Throwable $th) {
                DB::rollBack();
                return response([
                    'message' => 'error!',
                    'code' => Response::HTTP_INTERNAL_SERVER_ERROR
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
        return response([
            'message' => 'Update error!',
            'code' => Response::HTTP_NOT_FOUND
        ], Response::HTTP_OK);
    }

    public function destroy(Request $request)
    {
        $address = CustomerAddress::find($request->id);
        if ($address) {
            try {
                $address->delete();
                return response()->json([
                    'code' => Response::HTTP_OK,
                    'message' => 'success',
                ], Response::HTTP_OK);
            } catch (\Throwable $th) {
                return response([
                    'message' => 'error!',
                    'code' => Response::HTTP_INTERNAL_SERVER_ERROR
                ], Response::HTTP_INTERNAL_SERVER_ERROR);
            }
        }
        return response([
            'message' => 'Update error!',
            'code' => Response::HTTP_NOT_FOUND
        ], Response::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $account = Auth::guard('customerApi')->user()->load(['info']);
        if ($account) {
            return response([
                'account' => $account,
                'message' => 'success!',
                'code' => Response::HTTP_OK
            ], Response::HTTP_OK);
        }

        return response([
            'account' => [],
            'message' => 'This account dont exist!',
            'code' => Response::HTTP_NOT_FOUND
        ], Response::HTTP_NOT_FOUND);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getOrder(Request $request)
    {
        $customer = Customer::find(Auth::guard('customerApi')->user()->id);
        $orders = $customer->orders()->orderBy('created_at', 'desc');
        $total = $orders->count();
        if ($request->pageSize) {
            $orders->limit($request->pageSize)
                ->offset(($request->currentPage -1) * ($request->pageSize));
        }
        return response([
            'orders' => $orders->get(),
            'total' => $total,
            'code' => Response::HTTP_OK
        ], Response::HTTP_OK);
    }
}
