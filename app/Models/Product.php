<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    // Specify the table if different from the default 'products'
    protected $table = 'products';

    // Define which attributes are mass assignable
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'category',
        'image',
        'ratings',
        'rating_count',
        'brand',
        'is_active',
        'weight',
        'specifications',
    ];
    protected $casts = [
        'ratings' => 'decimal:2',  // Cast ratings to a decimal with 2 decimal points
        'is_active' => 'boolean',  // Cast is_active to a boolean value
        'weight' => 'integer',     // Cast weight to an integer
    ];
}
