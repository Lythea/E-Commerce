<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeaturedProduct extends Model
{
    use HasFactory;  // Ensure this line is added

    protected $fillable = [
        'name',
        'category',
        'description',
        'percent',
        'image_url',
        'current_price',
        'discounted_price',
        'expiration_date'
    ];
}
