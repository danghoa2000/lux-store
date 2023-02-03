<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use PhpParser\Node\Expr\FuncCall;

class AttributeValue extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'attribute_id',
        'attribute_value_name'
    ];

    protected $table = "attribute_value";
    public function attribute()
    {
        return $this->belongsTo(Attribute::class, "attribute_id", "id");
    }
    public function products()
    {
        return $this->belongsToMany(ProductDetail::class, "product_attribute_value", "attribute_value_id", "product_detail_id")->withTimestamps();
    }
}
