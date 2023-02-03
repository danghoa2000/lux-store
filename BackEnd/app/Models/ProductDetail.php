<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDetail extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'qty',
        'sold_qty',
        'product_id',
        'price'
    ];

    protected $table = "product_detail";

    protected $appends = ['sale_price', 'sale_persen'];

    public function propertyValue()
    {
        return $this->belongsToMany(AttributeValue::class, "product_attribute_value", "product_detail_id", "attribute_value_id")->withTimestamps();
    }

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function orderDetail()
    {
        return $this->belongsToMany(Order::class, 'order_detail', 'product_id', 'order_id');
    }

    public function getSalePriceAttribute()
    {
        if (
            $this->product->expried && date_format(Carbon::parse($this->product->expried), config('constants.date_format')) > date_format(Carbon::now(), config('constants.date_format'))
        ) {
            if ($this->product->sale_type &&  $this->product->sale_type != -1) {
                if ($this->product->sale_type == config('constants.sale_type.price')) {
                    return  $this->product->sale_off;
                } else {
                    return $this->attributes['price'] ? floor(($this->attributes['price'] * $this->product->sale_off) / 100) : 0;
                }
            }
            return 0;
        } else {
            return 0;
        }
    }

    public function getSalePersenAttribute()
    {
        if (
            $this->product->sale_type &&  $this->product->sale_type != -1 &&
            $this->product->expried && date_format(Carbon::parse($this->product->expried), config('constants.date_format')) >= date_format(Carbon::now(), config('constants.date_format'))
        ) {
            if ( $this->product->sale_type == config('constants.sale_type.persen')) {
                return  $this->product->sale_off;
            } else {
                return ceil(( $this->product->sale_off / $this->attributes['price']) * 100);
            }
        }
        return 0;
    }
}
