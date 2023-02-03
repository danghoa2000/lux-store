<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class CustomerAddress extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'code',
        'full_name',
        'telephone',
        'province_id',
        'district_id',
        'commune_id',
        'address',
        'status',
    ];

    protected $table = "customer_address";

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'code', 'id');
    }
}
