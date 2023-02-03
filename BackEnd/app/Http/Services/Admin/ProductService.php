<?php

namespace App\Http\Services\Admin;

use App\Models\Product;
use App\Models\ProductDetail;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ProductService
{
    public function list($request)
    {
        $products = Product::with(
            'productMedia:product_id,url',
            'productPrice:product_id,price',
            'productDetail:id,qty,sold_qty,product_id,price',
            'productDetail.propertyValue.attribute:id,name',
            'productDetail.propertyValue:id,attribute_id,attribute_value_name',
            'productSuggest',
            'category:id,name',
            'groupCategory:id,name',
            'manufacturer:id,name'
        )
            ->select(
                'id',
                'product_code',
                'name',
                'description',
                'category_id',
                'group_category_id',
                'manufacturer_id',
                'image',
                'status',
                'price',
                'expried',
                'sale_type',
                'sale_off'
            )
            ->withSum('productDetail', 'qty')
            ->filter($request);


        $data = json_decode($request->searchField, true);
        $allProduct = $products->get();
        if (!empty($data['price_min']) || !empty($data['price_max'])) {
            $allProduct = $allProduct->filter(function ($product) use ($data) {
                $result = true;
                if (!empty($data['price_min'])) {
                    if ($product['min_price'] < $data['price_min']) {
                        $result = false;
                    }
                }

                if (!empty($data['price_max'])) {
                    if ($product['max_price'] > $data['price_max']) {
                        $result = false;
                    }
                }
                return $result;
            });
        }
        $total = count($allProduct);
        if ($request->pageSize) {
            $allProduct = array_slice($allProduct->toArray(), $request->currentPage * $request->pageSize, $request->pageSize);
        }
        return response([
            'products' => $allProduct,
            'total' => $total,
            'code' => Response::HTTP_OK
        ], Response::HTTP_OK);
    }

    public function create($request)
    {
        try {
            DB::beginTransaction();
            $product = Product::create([
                'product_code' => $request->product_code,
                'name' => $request->name,
                'description' => $request->description,
                'category_id' =>  $request->category_id,
                'group_category_id' =>  $request->group_category_id,
                'manufacturer_id' =>  $request->manufacturer_id,
                "image" => $request->avatar ? $request->avatar[0]["file"] : "",
                "status" => $request->status,
                'sale_type' => $request->sale_type,
                'sale_off' => $request->price_saled,
                'expried' => $request->expried,
                // 'price' => $request->price,
            ]);
            if ($request->property) {
                foreach ($request->property as $item) {
                    $qty = $item["qty"];
                    $price = $item["price"];
                    unset($item["qty"]); // remove qty
                    unset($item["price"]); // remove price
                    $productDetail = ProductDetail::create([
                        "qty" => $qty,
                        "price" => $price,
                        "sold_qty" => 0,
                        "product_id" =>  $product->id,
                    ]);
                    $propertyValue = collect($item)->map(function ($element) {
                        return $element["attributeValue"];
                    });
                    $productDetail->propertyValue()->sync($propertyValue);
                }
            }
            $product->productMedia()->create(["url" => collect($request->file)->map(function ($item) {
                return $item["file"];
            })]);

            DB::commit();
            return response([
                'product' => $product,
                'message' => 'Create product success!',
                'code' => Response::HTTP_OK
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            DB::rollBack();
            return response([
                'message' => 'Create product error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function detail($request)
    {
        $product = Product::with(
            'productMedia:product_id,url',
            'productPrice:product_id,price',
            'productDetail:id,qty,sold_qty,product_id,price',
            'productDetail.propertyValue.attribute:id,name',
            'productDetail.propertyValue:id,attribute_id,attribute_value_name',
            'productSuggest',
            'category:id,name',
            'groupCategory:id,name',
            'manufacturer:id,name'
        )
            ->select(
                'id',
                'product_code',
                'name',
                'description',
                'category_id',
                'group_category_id',
                'manufacturer_id',
                'image',
                'status',
                'sale_type',
                'sale_off',
                'expried',
                'price'
            );

        if ($request->pageSize) {
            $product->with(['reviews' => function ($query) use ($request) {
                $query->limit($request->pageSize)
                    ->offset(($request->currentPage - 1) * ($request->pageSize));
            }]);
        }
        $product = $product->find($request->id);
        if ($product) {
            $totalRecord = $product->reviews()->count();
            $totalRate = $product->reviews()->avg('rate');
            return response([
                'product' => $product,
                'totalRecord' => $totalRecord,
                'totalRate' => $totalRate,
                'message' => 'success!',
                'code' => Response::HTTP_OK
            ], Response::HTTP_OK);
        }

        return response([
            'product' => [],
            'message' => 'This product dont exist!',
            'code' => Response::HTTP_NOT_FOUND
        ], Response::HTTP_NOT_FOUND);
    }

    public function edit($request)
    {
        try {
            DB::beginTransaction();
            $product = Product::find($request->id);
            if ($product) {
                $product->update([
                    'name' => $request->name,
                    'description' => $request->description,
                    'category_id' =>  $request->category_id,
                    'group_category_id' =>  $request->group_category_id,
                    'manufacturer_id' =>  $request->manufacturer_id,
                    "image" => $request->avatar ? $request->avatar[0]["file"] : "",
                    "status" => $request->status,
                    'sale_type' => $request->sale_type,
                    'sale_off' => $request->price_saled,
                    'expried' => $request->expried,
                    // 'price' => $request->price,
                ]);

                if ($request->property) {
                    foreach ($product->productDetail() as $item) {
                        $item->propertyValue()->delete();
                    }
                    $product->productDetail()->delete();
                    foreach ($request->property as $item) {
                        $qty = $item["qty"];
                        $price = $item["price"];
                        unset($item["qty"]); // remove qty
                        unset($item["price"]); // remove price
                        $productDetail = ProductDetail::create([
                            "qty" => $qty,
                            "price" => $price,
                            "sold_qty" => 0,
                            "product_id" =>  $product->id,
                        ]);
                        $propertyValue = collect($item)->map(function ($element) {
                            return $element["attributeValue"];
                        });
                        $productDetail->propertyValue()->sync($propertyValue);
                    }
                }
                $product->productMedia()->updateOrCreate(['product_id' => $product->id], ["url" => collect($request->file)->map(function ($item) {
                    return $item["file"];
                })]);

                DB::commit();
                return response([
                    'message' => 'Update product success!',
                    'code' => Response::HTTP_OK
                ], Response::HTTP_OK);
            }
            return response([
                'message' => 'This product dont exist!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        } catch (\Throwable $th) {
            DB::rollBack();
            dd($th);

            return response([
                'message' => 'Update product error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    public function delete($id)
    {
        try {
            $product = Product::find($id);
            if ($product) {
                $product->update([
                    'status' => 0
                ]);
                return response([
                    'message' => 'success!',
                    'code' => Response::HTTP_OK
                ], Response::HTTP_OK);
            }

            return response([
                'message' => 'This product dont exist!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        } catch (\Throwable $th) {
            return response([
                'message' => 'Delete product error!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
