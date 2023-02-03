<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

use function PHPSTORM_META\map;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'user_code',
        'role',
        'status',
        'info_id',
        'created_by'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $table = "users";

    public function info()
    {
        return $this->hasOne(Info::class, 'id', 'info_id');
    }

    public function scopeFilter($query, $request)
    {
        $data = json_decode($request->searchField, true);
        if (!empty($data['user_code'])) {
            $query->where('user_code', $data['user_code']);
        }
        if (!empty($data['role']) && $data['role'] != -1) {
            $query->where('role', $data['role']);
        }
        if (!empty($data['status']) && $data['status'] != -1) {
            $query->where('status', $data['status']);
        }
        if (isset($data['status']) && $data['status'] == 0) {
            $query->where('status', $data['status']);
        }
        if (!empty($data['full_name'])) {
            $query->whereHas('info', function ($q) use ($data) {
                $q->where('full_name', 'like', '%' . $data['full_name'] . '%');
            });
        }
        if (!empty($data['email'])) {
            $query->whereHas('info', function ($q) use ($data) {
                $q->where('email', $data['email']);
            });
        }
        if (!empty($data['telephone'])) {
            $query->whereHas('info', function ($q) use ($data) {
                $q->where('telephone', $data['telephone']);
            });
        }
        if (!empty($data['birthday'])) {
            $query->whereHas('info', function ($q) use ($data) {
                $q->where('birthday', $data['birthday']);
            });
        }
        if (!empty($data['address'])) {
            $query->whereHas('info', function ($q) use ($data) {
                $q->where('address', 'like', '%' . $data['address'] . '%');
            });
        }
        return $query;
    }
}
