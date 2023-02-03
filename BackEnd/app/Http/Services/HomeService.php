<?php

namespace App\Http\Services;

use App\Models\Category;
use App\Models\Event;
use App\Models\GroupCategory;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class HomeService
{
    public function index()
    {
        $flashDelas = Product::where('sale_type', '<>', -1)
            ->where('expried', '>=', Carbon::now())
            ->with('productDetail:qty,sold_qty,product_id,price')
            ->where('status', config('constants.user.status.active'))
            ->select('id', 'name', 'image', 'expried', 'sale_type', 'price', 'sale_off')
            ->limit(10)
            ->offset(0)
            ->get();

        $newArrivals = Product::orderBy('updated_at', 'desc')
            ->with('productDetail:qty,sold_qty,product_id,price')
            ->where('status', config('constants.user.status.active'))
            ->select('id', 'name', 'image', 'expried', 'sale_type', 'price', 'sale_off')
            ->limit(10)
            ->offset(0)
            ->get();

        $bigDiscounts = Product::whereHas('events', function ($query) {
            $query->where('event_type', Event::BIG_DISCOUNTS);
        })
            ->with('productDetail:qty,sold_qty,product_id,price')
            ->where('status', config('constants.user.status.active'))
            ->select('id', 'name', 'image', 'expried', 'sale_type', 'price', 'sale_off')
            ->get();

        $ortherProduct = Product::with('productDetail:qty,sold_qty,product_id,price')
            ->where('status', config('constants.user.status.active'))
            ->select('id', 'name', 'image', 'expried', 'sale_type', 'price', 'sale_off')
            ->limit(9)
            ->offset(0)
            ->get();

        $topRateProduct = Product::select('id', 'name', 'image', 'expried', 'sale_type', 'price', 'sale_off')
            ->withCount(
                [
                    'reviews AS rating' => function ($query) {
                        $query->select(DB::raw('AVG(rate)'), 'product_id', 'user_id');
                    }
                ]
            )
            ->where('status', config('constants.user.status.active'))
            ->orderBy('rating', 'desc')
            ->limit(10)
            ->offset(0)
            ->get();

        $brand = Category::select(
            'id',
            'category_code',
            'name',
            'group_category_id',
            'description',
            'created_by',
            'status',
        )
            ->where('status', config('constants.user.status.active'))
            ->limit(6)
            ->offset(0)
            ->get();
        return response([
            'flashDelas' => $flashDelas,
            'newArrivals' => $newArrivals,
            'bigDiscounts' => $bigDiscounts,
            'ortherProduct' => $ortherProduct,
            'topRateProduct' => $topRateProduct,
            'brand' => $brand,
            'message' => 'success!',
            'code' => Response::HTTP_OK
        ], Response::HTTP_OK);
    }

    public function search($request)
    {
        $products = Product::with('productDetail:qty,sold_qty,product_id,price')
            ->select('id', 'name', 'image', 'expried', 'sale_type', 'price', 'sale_off')
            ->filter($request)
            ->where('status', config('constants.user.status.active'));
        $products = $products->get();
        $data = json_decode($request->searchField, true);
        $products = $products->filter(function ($item) use ($data) {
            $isReturn = true;
            if (!empty($data['rate'])) {
                $isReturn = $item['total_rate'] == $data['rate'];
            }
            if (!empty($data['price_max'])) {
                if ($item['max_price'] > $data['price_max']) {
                    $isReturn = false;
                }
            }
            if (!empty($data['price_min'])) {
                if ($item['min_price'] < $data['price_min']) {
                    $isReturn = false;
                }
            }
            return $isReturn;
        })->map(function ($item) {
            return $item;
        });

        $total = count($products);
        $products = array_slice($products->toArray(), ($request->currentPage - 1) * $request->pageSize, $request->pageSize, true);
        return response([
            'products' => $products,
            'total' => $total,
            'code' => Response::HTTP_OK
        ], Response::HTTP_OK);
    }

    public function getFormFilter($request)
    {
        $data = $request->group_category_id;
        $formFilter = [];
        $groupCategory = GroupCategory::select('id', 'name')->get();
        $formFilter['groupCategory'] = $groupCategory;
        if ($data) {
            $groupCategory = GroupCategory::select('id', 'name')->where('id', $data);
            $category = Category::where('group_category_id', $data)
                ->select('id', 'name')
                ->get();

            $formFilter['category'] = $category;

            $attributes = $groupCategory->first() ? $groupCategory->first()->attributes : null;
            if ($attributes) {
                foreach ($attributes as $item) {
                    $formFilter['attribute'][$item->id] = [
                        'name' => $item->name,
                        'option' => $item->attributeValue
                            ->filter(function ($value) {
                                return $value->products()->count();
                            })
                            ->map(function ($data) {
                                $newData = [];
                                $newData['id'] = $data['id'];
                                $newData['name'] = $data['attribute_value_name'];
                                return $newData;
                            })
                    ];
                }
            }
        }



        $formFilter['rate'] = true;
        $formFilter['price'] = true;

        return response([
            'formFilter' => $formFilter,
            'code' => Response::HTTP_OK
        ], Response::HTTP_OK);
    }
}
