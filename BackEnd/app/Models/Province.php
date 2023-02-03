<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Province extends Model
{
    use HasFactory;

    protected $table = 'province';

    protected $fillable = [
        'name',
    ];

    /**
     * Get all the districts of the province.
     *
     * @return HasMany
     */
    public function districts()
    {
        return $this->hasMany(District::class);
    }
}
