<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manufacturer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'manufacturer_code',
        'name',
        'status',
        'telephone',
        'address'
    ];

    protected $table = 'manufacturer';

    public function scopeFilter($query, $request)
    {
        $data = json_decode($request->searchField, true);
        if (!empty($data['manufacturer_code'])) {
            $query->where('manufacturer_code', $data['manufacturer_code']);
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
        if (!empty($data['telephone'])) {
            $query->where('telephone', $data['telephone']);
        }
        if (!empty($data['address'])) {
            $query->where('address', 'like', '%' . $data['address'] . '%');
        }
        return $query;
    }
}
