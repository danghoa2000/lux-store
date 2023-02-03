<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory;
    
    protected $table = "order_detail";
    protected $guarded = [];
    protected $fillable = [
        'order_id',
        'product_id',
        'product_name',
        'product_price',
        'qty',
    ];

    public function order()
    {
        return $this->belongsTo(Order::class, 'order_id', 'id');
    }

    public function products()
    {
        return $this->hasMany(ProductDetail::class, 'order_id', 'id');
    }
}
