<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CareerListing extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'specifications' => 'array',
        'skills' => 'array',
        'responsibilities' => 'array',
        'is_active' => 'boolean'
    ];
}
