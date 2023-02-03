<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $table = 'cart';
    protected $guarded = [];
    public function products()
    {
        return $this->belongsToMany(ProductDetail::class, 'cart_product', 'cart_id', 'product_id')->withPivot('qty')->withTimestamps();
    }
}
