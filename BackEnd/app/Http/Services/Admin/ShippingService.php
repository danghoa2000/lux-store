<?php

namespace App\Http\Services\Admin;

use App\Models\Shipping;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ShippingService
{
    public function list($request)
    {
        $shippings = Shipping::with('province', 'district', 'commune');
        $total = count($shippings->get());
        $shippings->limit($request->pageSize)
            ->offset(($request->currentPage) * $request->pageSize);
        return response([
            'shippings' => $shippings->get(),
            'total' => $total,
            'code' => Response::HTTP_OK
        ], Response::HTTP_OK);
    }

    public function create($request)
    {
        try {
            DB::beginTransaction();
            $checkExistShipping = Shipping::where('province_id', $request->province_id)
                ->where('district_id', $request->district_id)
                ->where('commune_id', $request->commune_id)
                ->first();
            if ($checkExistShipping) {
                return response([
                    'message' => 'This shipping has already created, Create shipping error!',
                    'code' => Response::HTTP_FOUND
                ], Response::HTTP_FOUND);
            }
            $shipping = Shipping::create([
                'province_id' => $request->province_id,
                'district_id' => $request->district_id,
                'commune_id' => $request->commune_id,
                'price' => $request->price,
            ]);

            DB::commit();
            return response([
                'shipping' => $shipping,
                'message' => 'Create shipping success!',
                'code' => Response::HTTP_OK
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {

            DB::rollBack();
            return response([
                'message' => 'Create shipping error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function detail($request)
    {
        $shipping = Shipping::find($request->id);
        if ($shipping) {
            return response([
                'shipping' => $shipping,
                'message' => 'success!',
                'code' => Response::HTTP_OK
            ], Response::HTTP_OK);
        }

        return response([
            'shipping' => [],
            'message' => 'This shipping dont exist!',
            'code' => Response::HTTP_NOT_FOUND
        ], Response::HTTP_NOT_FOUND);
    }

    public function edit($request)
    {
        try {
            DB::beginTransaction();
            $shipping = Shipping::find($request->id);
            if ($shipping) {
                $shipping->update([
                    'price' => $request->price,
                ]);

                DB::commit();
                return response([
                    'shipping' => $shipping,
                    'message' => 'Update shipping success!',
                    'code' => Response::HTTP_OK
                ], Response::HTTP_OK);
            }

            return response([
                'shipping' => [],
                'message' => 'This shipping dont exist!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'message' => 'Update shipping error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
