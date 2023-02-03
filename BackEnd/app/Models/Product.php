<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    const UPLOAD_PATH = "product/";

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'product_code',
        'name',
        'status',
        'description',
        'country_id',
        'price',
        'category_id',
        'group_category_id',
        'manufacturer_id',
        'image',
        'sale_type',
        'sale_off',
        'expried',
        'customer_review'
    ];

    protected $table = 'products';

    protected $appends = ['total_rate', 'sale_price', 'sale_persen', 'max_price', 'min_price', 'sold_qty'];

    public function productDetail()
    {
        return $this->hasMany(ProductDetail::class, 'product_id', 'id');
    }

    public function manufacturer()
    {
        return $this->belongsTo(Manufacturer::class, 'manufacturer_id', 'id');
    }

    public function productMedia()
    {
        return $this->hasOne(ProductMedia::class, 'product_id', 'id');
    }

    public function productPrice()
    {
        return $this->hasMany(ProductPrice::class, 'product_id', 'id')->orderByDesc("created_at");
    }

    public function productProperties()
    {
        return $this->hasMany(ProductProperty::class, 'product_id', 'id');
    }

    public function productSuggest()
    {
        return $this->hasMany(ProductSuggest::class, 'product_id', 'id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }

    public function groupCategory()
    {
        return $this->belongsTo(GroupCategory::class, 'group_category_id', 'id');
    }

    public function events()
    {
        return $this->belongsToMany(Event::class, 'product_event', 'product_id', 'event_type');
    }

    public function reviews()
    {
        return $this->belongsToMany(Customer::class, 'reviews', 'product_id', 'user_id')
            ->withPivot('rate', 'name', 'content', 'email', 'parent_id')
            ->wherePivot('parent_id', null)
            ->withTimestamps();
    }

    public function orderDetail()
    {
        return $this->belongsToMany(OrderDetail::class, 'product_order', 'product_id', 'order_detail_id');
    }

    public function getTotalRateAttribute()
    {
        return $this->reviews->avg('pivot.rate');
    }

    public function getSalePriceAttribute()
    {
        if (
            $this->attributes['expried'] && date_format(Carbon::parse($this->attributes['expried']), config('constants.date_format')) > date_format(Carbon::now(), config('constants.date_format'))
        ) {
            if ($this->attributes['sale_type'] && $this->attributes['sale_type'] != -1) {
                if ($this->attributes['sale_type'] == config('constants.sale_type.price')) {
                    return $this->attributes['sale_off'];
                } else {
                    return $this->getMinPriceAttribute() ? floor(($this->getMinPriceAttribute() * $this->attributes['sale_off']) / 100) : 0;
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
            $this->attributes['sale_type'] && $this->attributes['sale_type'] != -1 &&
            $this->attributes['expried'] && date_format(Carbon::parse($this->attributes['expried']), config('constants.date_format')) >= date_format(Carbon::now(), config('constants.date_format'))
        ) {
            if ($this->attributes['sale_type'] == config('constants.sale_type.persen')) {
                return $this->attributes['sale_off'];
            } else {
                return ceil(($this->attributes['sale_off'] / $this->getMinPriceAttribute()) * 100);
            }
        }
        return 0;
    }


    public function getMinPriceAttribute()
    {
        return $this->productDetail()->min('price');
    }

    public function getMaxPriceAttribute()
    {
        return $this->productDetail()->max('price');
    }

    public function getSoldQtyAttribute()
    {
        return $this->productDetail()->sum('sold_qty');
    }


    // public function getImageAttribute()
    // {
    //     return 'http://127.0.0.1:8000/' . $this->attributes['image'];
    // }

    public function scopeFilter($query, $request)
    {
        $data = json_decode($request->searchField, true);
        if (!empty($data['product_code'])) {
            $query->where('product_code', $data['product_code']);
        }
        if (!empty($data['status']) && $data['status'] != -1) {
            $query->where('status', $data['status']);
        }
        if (isset($data['status']) && $data['status'] == 0) {
            $query->where('status', $data['status']);
        }
        if (!empty($data['name'])) {
            $query->where('name', 'like', '%' . $data['name'] . '%');
        }
        // if (!empty($data['price_min'])) {
        //     $query->where('price', ">=", $data['price_min']);
        // }
        // if (!empty($data['price_max'])) {
        //     $query->where('price', "<=", $data['price_max']);
        // }
        if (!empty($data['category_id'])) {
            if (is_array($data['category_id'])) {
                $query->whereIn('category_id',  $data['category_id']);
            } else {
                if ($data['category_id'] != -1) {
                    $query->where('category_id',  $data['category_id']);
                }
            }
        }
        if (!empty($data['manufacturer']) && $data['manufacturer'] != -1) {
            $query->where('manufacturer_id',  $data['manufacturer_id']);
        }
        if (!empty($data['group_category_id'])) {
            if (is_array($data['group_category_id'])) {
                $query->whereIn('group_category_id',  $data['group_category_id']);
            } else {
                if ($data['group_category_id'] != -1) {
                    $query->where('group_category_id',  $data['group_category_id']);
                }
            }
        }
        if (!empty($data['attribute'])) {
            $query->whereHas('productDetail.propertyValue', function ($q) use ($data) {
                $q->whereIn('attribute_value_id', $data['attribute']);
            });
        }
        return $query;
    }
}
