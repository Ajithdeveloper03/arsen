<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CareerListing extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'department',
        'location',
        'salary',
        'image_url',
        'specifications',
        'is_active'
    ];

    protected $casts = [
        'specifications' => 'array',
        'is_active' => 'boolean'
    ];
}
