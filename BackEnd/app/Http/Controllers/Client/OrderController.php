<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Jobs\SendNotiOrder;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\ProductDetail;
use App\Models\Voucher;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    const ORDER_STATUS = [
        '0' => 'Pending',
        '1' => 'Delivery',
        '2' => 'Success',
        '3' => 'Cancel'
    ];
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $orders = Order::query()->filter($request);
        $total = count($orders->get());
        if ($request->pageSize) {
            $orders->limit($request->pageSize)
                ->offset(($request->currentPage) * ($request->pageSize));
        }
        return response([
            'orders' => $orders->get(),
            'total' => $total,
            'code' => Response::HTTP_OK
        ], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            $user = Auth::guard('customerApi')->user();

            // add order
            $order = Order::create([
                'customer_id' => $user->id,
                'status' => $request->orderStatus,
                'price' => $request->totalPrice + $request->shipping,
                'price_discount' => 0,
                'note' => $request->note,
                'address' => $request->address,
                'payment_method' => $request->paymentMethod,
            ]);

            $productList = [];
            $productsOrder = [];
            foreach ($request->cart as $value) {
                $key = $value['id'];
                // $productsOrder[$key]['product_id'] = $key;
                // $productsOrder[$key]['order_id'] = $order->id;
                $productsOrder[$key]['product_name'] = $value['product']['name'];
                $productsOrder[$key]['product_price'] = $value['price'] - $value['sale_price'];
                $productsOrder[$key]['qty'] = $value['pivot']['qty'];
                $productList[] = $value['product']['id'];
            }

            $productList = array_unique($productList);
            if (isset($request->voucher["id"])) {
                $voucher = Coupon::find($request->voucher["id"]);
                if ($voucher->qty > 0 && Carbon::parse($voucher->date_finish)->format('Y-m-d') >= Carbon::now()->format('Y-m-d')) {
                    $order->update([
                        'price' => $order->price - $voucher->value,
                        'price_discount' => $voucher->value
                    ]);
                    $voucher->update([
                        'qty' => $voucher->qty - 1
                    ]);
                }
            }
            $order->orderDetail()->attach($productsOrder);
            // update qty product
            $product = ProductDetail::whereIn('id', array_keys($productsOrder))->get();
            $options = [];
            foreach ($product as $data) {
                $options[$data->id]['id'] =  $data->id;
                $options[$data->id]['qty'] =  $data['qty'] - $productsOrder[$data->id]['qty'];
                $options[$data->id]['sold_qty'] =  $data['sold_qty'] + $productsOrder[$data->id]['qty'];
            }
            ProductDetail::upsert($options, ['id'], ['qty', 'sold_qty']);

            // delete cart
            $user->cart->products()->detach(array_keys($productsOrder));
            $content = ' <span>' . config("app.name") . '</span>
            is happy to announce that your quote #'.$order->id.' has been received and is in the process of being processed. We will notify you of the exact order as soon as we receive it (within 24 hours).
            <br>';
            SendNotiOrder::dispatch($order, $content);
            DB::commit();
            return response([
                'message' => "success",
                'code' => Response::HTTP_OK
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'message' => 'error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $order = Order::with('orderDetail.propertyValue')->find($request->id);
        if ($order) {
            return response([
                'order' => $order,
                'message' => 'success!',
                'code' => Response::HTTP_OK
            ], Response::HTTP_OK);
        }

        return response([
            'message' => 'This order dont exist!',
            'code' => Response::HTTP_NOT_FOUND
        ], Response::HTTP_NOT_FOUND);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try {
            DB::beginTransaction();
            $order = Order::with('orderDetail.propertyValue')->find($request->id);
            if ($order) {
                $order->update(['status' => $request->order_status]);
                $content = ' <span>' . config("app.name") . '</span>
                notify #' . $order->id . '
                <br>
                Your order status has been updated to ' . self::ORDER_STATUS[$request->order_status];
                if ($request->order_status == 3) {
                    $productsOrder = [];
                    foreach ($order->orderDetail as $value) {
                        $key = $value['id'];
                        $productsOrder[$key]['id'] = $key;
                        $productsOrder[$key]['qty'] = $value['pivot']['qty'];
                    }

                    $product = ProductDetail::whereIn('id', array_keys($productsOrder))->get();
                    $options = [];
                    foreach ($product as $data) {
                        $options[$data->id]['id'] =  $data->id;
                        $options[$data->id]['qty'] =  $data['qty'] + $productsOrder[$data->id]['qty'];
                        $options[$data->id]['sold_qty'] =  $data['sold_qty'] - $productsOrder[$data->id]['qty'];
                    }

                    ProductDetail::upsert($options, ['id'], ['qty', 'sold_qty']);
                }
                SendNotiOrder::dispatch($order, $content);
                DB::commit();
                return response([
                    'order' => $order,
                    'message' => 'success!',
                    'code' => Response::HTTP_OK
                ], Response::HTTP_OK);
            } else {
                return response([
                    'message' => 'This order dont exist!',
                    'code' => Response::HTTP_NOT_FOUND
                ], Response::HTTP_NOT_FOUND);
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'message' => 'server error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return;
    }

    /**
     * checkVouchervalid.
     *
     * @param  collection  voucher
     * @param  array  product
     * @param  string  user id
     * 
     * @return \Illuminate\Http\Response
     */
    public function checkVouchervalid($voucher, $product, $user)
    {
        $result = true;
        if (isset($voucher->expried_date) && Carbon::parse($voucher->expried_date)->format('Y-m-d h:i:s') < Carbon::now()->format('Y-m-d h:i:s')) {
            $result = false;
        }

        $productList = json_decode($voucher->product_id);
        if (!array_intersect($productList, $product)) {
            $result = false;
        }

        $customerList = json_decode($voucher->customer_id);
        if (in_array($user, $customerList)) {
            $result = false;
        }
        return $result;
    }
}
