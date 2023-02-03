<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Coupon;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class CouponController extends Controller
{
    public function index(Request $request)
    {
        $coupons = Coupon::select(
            'id',
            'coupon_code',
            'date_start',
            'date_finish',
            'value',
            'qty',
            'status',
        )->filter($request);
        $total = count($coupons->get());
        if ($request->pageSize) {
            $coupons
                ->limit($request->pageSize)
                ->offset(($request->currentPage) * ($request->pageSize));
        }
        return response([
            'coupons' => $coupons->get(),
            'total' => $total,
            'code' => Response::HTTP_OK
        ], Response::HTTP_OK);
    }

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            $coupon = Coupon::create([
                'coupon_code' => $request->coupon_code,
                'date_start' => $request->date_start,
                'value' => $request->value,
                'date_finish' => $request->date_finish,
                'qty' => $request->qty,
                'status' => $request->status
            ]);

            DB::commit();
            return response([
                'coupon' => $coupon,
                'message' => 'Create coupon success!',
                'code' => Response::HTTP_OK
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'message' => 'Create coupon error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function show(Request $request)
    {
        $coupon = Coupon::find($request->id);
        if ($coupon) {
            return response([
                'coupon' => $coupon,
                'message' => 'success!',
                'code' => Response::HTTP_OK
            ], Response::HTTP_OK);

            return response([
                'message' => 'Voucher is Invalid!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        }

        return response([
            'coupon' => [],
            'message' => 'This coupon dont exist!',
            'code' => Response::HTTP_NOT_FOUND
        ], Response::HTTP_NOT_FOUND);
    }

    public function checkValid(Request $request)
    {
        $coupon = Coupon::where('coupon_code', $request->coupon_code)->where('status', 1)->first();
        if ($coupon) {
            if ($coupon->qty > 0 && Carbon::parse($coupon->date_finish)->format('Y-m-d') >= Carbon::now()->format('Y-m-d')) {
                return response([
                    'id' => $coupon->id,
                    'name' => $coupon->coupon_code,
                    'value' => $coupon->value,
                    'message' => 'success!',
                    'code' => Response::HTTP_OK
                ], Response::HTTP_OK);
            }

            return response([
                'message' => 'Voucher is Invalid!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_OK);
        }

        return response([
            'coupon' => [],
            'message' => 'This coupon dont exist!',
            'code' => Response::HTTP_NOT_FOUND
        ], Response::HTTP_OK);
    }

    public function update(Request $request)
    {
        try {
            DB::beginTransaction();
            $coupon = Coupon::find($request->id);
            if ($coupon) {
                $coupon->update([
                    'coupon_code' => $request->coupon_code,
                    'date_start' => $request->date_start,
                    'value' => $request->value,
                    'date_finish' => $request->date_finish,
                    'qty' => $request->qty,
                    'status' => $request->status
                ]);

                DB::commit();
                return response([
                    'coupon' => $coupon,
                    'message' => 'Update coupon success!',
                    'code' => Response::HTTP_OK
                ], Response::HTTP_OK);
            }

            return response([
                'coupon' => [],
                'message' => 'This coupon dont exist!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'message' => 'Update coupon error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy($id)
    {
        try {
            $coupon = Coupon::find($id);
            if ($coupon) {
                $coupon->update([
                    'status' => 0
                ]);
                return response([
                    'message' => 'success!',
                    'code' => Response::HTTP_OK
                ], Response::HTTP_OK);
            }

            return response([
                'message' => 'This coupon dont exist!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        } catch (\Throwable $th) {
            return response([
                'message' => 'Delete coupon error!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
