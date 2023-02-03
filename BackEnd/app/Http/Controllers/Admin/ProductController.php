<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Services\Admin\ProductService;
use App\Http\Services\UploadService;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    protected $pathUpload = "product";
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return $this->productService->list($request);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->productService->create($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        return $this->productService->detail($request);
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
        return $this->productService->edit($request);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->productService->delete($id);
    }


    /**
     * Review product.
     *
     * @return \Illuminate\Http\Response
     */
    public function review(Request $request)
    {
        try {
            DB::beginTransaction();
            $product = Product::find($request->id);
            $user = Auth::guard('customerApi')->user();
            $option[$user->id] = [
                'content' => $request->content,
                'rate' => $request->rate,
                'name' => $user->info->full_name
            ];
            if ($product) {
                $product->reviews()->attach($option);
                if ($product->customer_review) {
                    $arr = json_decode($product->customer_review);
                    $arr[] = $user->id;

                    $product->update(['customer_review' => json_encode($arr)]);
                } else {
                    $arr[] = $user->id;
                    $product->update(['customer_review' => json_encode($arr)]);
                }
                DB::commit();
                return response([
                    'message' => 'Review success!',
                    'code' => Response::HTTP_OK
                ], Response::HTTP_OK);
            }
            return response([
                'message' => 'This product dont exist!',
                'code' => Response::HTTP_NOT_FOUND
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response([
                'message' => 'Server error!',
                'code' => Response::HTTP_INTERNAL_SERVER_ERROR
            ], Response::HTTP_OK);
        }
    }

    public function reviewShow(Request $request)
    {
        $review = Product::join('reviews', 'products.id', '=', 'reviews.product_id')
            ->join('customer', 'customer.id', '=', 'reviews.user_id')
            ->where('products.id', $request->productId)
            ->where('customer.id', $request->userId)
            ->select(
                'products.id',
                'products.product_code',
                'products.name',
                'products.description',
                'products.category_id',
                'products.group_category_id',
                'products.manufacturer_id',
                'products.image',
                'products.status',
                'products.price',
                'products.expried',
                'products.sale_type',
                'products.sale_off'
            )
            ->selectRaw(('reviews.rate, reviews.content, reviews.created_at, reviews.name as customer_name'))
            ->first();
        return response([
            'review' => $review,
            'message' => 'Review success!',
            'code' => Response::HTTP_OK
        ], Response::HTTP_OK);
    }
}
