<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupon extends Model
{
    use HasFactory;

    protected $table = 'coupons';
    protected $guarded = [];

    public function scopeFilter($query, $request)
    {
        $data = json_decode($request->searchField, true);
        if (!empty($data['coupon_code'])) {
            $query->where('coupon_code', $data['coupon_code']);
        }
        if (!empty($data['status']) && $data['status'] != -1) {
            $query->where('status', $data['status']);
        }
        if (isset($data['status']) && $data['status'] == 0) {
            $query->where('status', $data['status']);
        }
        if (!empty($data['date_start'])) {
            $query->where('date_start', '>=', $data['date_start']);
        }
        if (!empty($data['date_finish'])) {
            $query->where('date_finish', '<=', $data['date_finish']);
        }
        return $query;
    }
}
