<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;
    protected $table = "event";
    const FLASH_DELAS = 1;
    const NEW_ARRIVALS = 2;
    const BIG_DISCOUNTS = 3;

    public function products()
    {
        return $this->belongsToMany(Product::class, "product_event", "event_type", 'product_id');
    }
}
