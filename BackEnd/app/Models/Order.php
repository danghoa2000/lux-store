<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'order';
    protected $guarded = [];

    public function orderDetail()
    {
        return $this->belongsToMany(ProductDetail::class, 'order_detail', 'order_id', 'product_id')->withTimestamps()->withPivot('product_name', 'product_price', 'qty');
    }

    public function scopeFilter($query, $request)
    {
        $data = json_decode($request->searchField, true);
        if (!empty($data['order_code'])) {
            $query->where('id', $data['order_code']);
        }
        if (!empty($data['status']) && $data['status'] != -1) {
            $query->where('status', $data['status']);
        }
        if (isset($data['status']) && $data['status'] == 0) {
            $query->where('status', $data['status']);
        }
        if (!empty($data['customer_name'])) {
            $query->where('address', 'like', '%' . $data['customer_name'] . '%');
        }
        if (!empty($data['price_min'])) {
            $query->where('price', ">=", $data['price_min']);
        }
        if (!empty($data['price_max'])) {
            $query->where('price', "<=", $data['price_max']);
        }
        if (!empty($data['order_start'])) {
            $query->where('created_at', ">=", Carbon::parse($data['order_start'])->format("Y-m-d"));
        }
        if (!empty($data['order_end'])) {
            $query->where('created_at', "<=", Carbon::parse($data['price_max'])->format("Y-m-d"));
        }
        if (!empty($data['address'])) {
            $query->where('address', 'like', '%' . $data['address'] . '%');
        }

        // if (!empty($data['category_id'])) {
        //     if (is_array($data['category_id'])) {
        //         $query->whereIn('category_id',  $data['category_id']);
        //     } else {
        //         if ($data['category_id'] != -1) {
        //             $query->where('category_id',  $data['category_id']);
        //         }
        //     }
        // }
        // if (!empty($data['manufacturer']) && $data['manufacturer'] != -1) {
        //     $query->where('manufacturer_id',  $data['manufacturer_id']);
        // }
        // if (!empty($data['group_category_id'])) {
        //     if (is_array($data['group_category_id'])) {
        //         $query->whereIn('group_category_id',  $data['group_category_id']);
        //     } else {
        //         if ($data['group_category_id'] != -1) {
        //             $query->where('group_category_id',  $data['group_category_id']);
        //         }
        //     }
        // }
        // if (!empty($data['attribute'])) {
        //     $query->whereHas('productDetail.propertyValue', function ($q) use ($data) {
        //         $q->whereIn('attribute_value_id', $data['attribute']);
        //     });
        // }
        return $query;
    }
}
