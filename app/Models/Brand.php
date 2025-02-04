<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
      use HasFactory;

    protected $table = 'brand'; 

    // Specify which attributes are mass assignable
    protected $fillable = [
        'name', 
        'image', // This assumes you store the image URL/path in the database
    ];
}
