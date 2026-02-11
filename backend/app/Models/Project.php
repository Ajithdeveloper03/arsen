<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'location',
        'image_url',
        'description',
        'type',
        'status',
        'is_featured',
        'order_index'
    ];

    //
}
