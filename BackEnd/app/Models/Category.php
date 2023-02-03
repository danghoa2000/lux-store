<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use PhpParser\Node\Expr\FuncCall;

class Category extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'category_code',
        'name',
        'parent_id',
        'description',
        'image',
        'type',
        'group_category_id',
        'created_by',
        'status',
    ];

    protected $table = "categories";

    public function subCategories()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function groupCategory()
    {
        return $this->belongsTo(GroupCategory::class, 'group_category_id', 'id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by', 'id');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id', 'id');
    }

    public function scopeFilter($query, $request)
    {
        $data = json_decode($request->searchField, true);
        if (!empty($data['category_code'])) {
            $query->where('category_code', $data['category_code']);
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
        if (!empty($data['group_category_id']) && $data['group_category_id'] != -1) {
            $query->where('group_category_id', $data['group_category_id']);
        }
        if (!empty($data['description'])) {
            $query->where('description', 'like', '%' . $data['description'] . '%');
        }
        if (!empty($data['created_by'])) {
            $query->whereHas('createdBy.info', function ($query) use ($data) {
                $query->where('full_name', 'like', '%' . $data['created_by'] . '%');
            });
        }
        return $query;
    }
}
