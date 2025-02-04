<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // Specify the table name if it's not the plural form of the model name
    protected $table = 'category'; // Optional if you use the default Laravel plural naming convention

    // Specify which attributes are mass assignable
    protected $fillable = [
        'name', 
        'image', // This assumes you store the image URL/path in the database
    ];
}
