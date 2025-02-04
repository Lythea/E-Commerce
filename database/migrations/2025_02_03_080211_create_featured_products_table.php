<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('featured_products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
               $table->string('category');
            $table->text('description');
            $table->decimal('percent', 5, 2); // Discount percentage
            $table->string('image_url');
            $table->decimal('current_price', 10, 2);
            $table->decimal('discounted_price', 10, 2);
            $table->date('expiration_date'); // Add expiration_date column here
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('featured_products');
    }
};
