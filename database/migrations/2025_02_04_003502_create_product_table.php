<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

   public function up()
{
    Schema::create('products', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->text('description')->nullable();
        $table->decimal('price', 10, 2);
        $table->integer('stock');
        $table->string('category'); // Category for classification
        $table->string('image')->nullable(); // Image URL or path to product image
        $table->decimal('ratings', 3, 2)->default(0.00); // Average rating, e.g., 4.50 out of 5
        $table->integer('rating_count')->default(0); // Number of ratings received
        $table->string('brand')->nullable(); // Brand of the product
        $table->boolean('is_active')->default(true); // To mark if the product is available for sale
        $table->integer('weight')->nullable(); // Weight of the product for shipping calculations
        $table->text('specifications')->nullable(); // Additional specifications/details of the product
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
