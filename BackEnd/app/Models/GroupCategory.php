<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GroupCategory extends Model
{
    use HasFactory;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'group_category_code',
        'name',
        'status',
        'image'
    ];

    protected $table = 'group_category';

    public function attributes()
    {
        return $this->belongsToMany(Attribute::class, "group_category_attribute", "group_category_id", "attribute_id")->withTimestamps();
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'group_category_id', 'id');
    }

    public function scopeFilter($query, $request)
    {
        $data = json_decode($request->searchField, true);
        if (!empty($data['group_category_code'])) {
            $query->where('group_category_code', $data['group_category_code']);
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
        return $query;
    }
}
