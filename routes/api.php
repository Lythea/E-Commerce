<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SaleBannerController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\FeaturedProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\BrandController;

Route::prefix('brands')->group(function () {
    Route::get('/', [BrandController::class, 'index']);
    Route::post('/', [BrandController::class, 'store']);
    Route::post('/update/{id}', [BrandController::class, 'update']);
    Route::delete('/{id}', [BrandController::class, 'destroy']);
    Route::get('/count', [BrandController::class, 'count']); // Add count route
});

Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']);
    Route::post('/', [CategoryController::class, 'store']);
    Route::post('/update/{id}', [CategoryController::class, 'update']);
    Route::delete('/{id}', [CategoryController::class, 'destroy']);
    Route::get('/count', [CategoryController::class, 'count']); // Add count route
});

Route::prefix('saleBanner')->group(function () {
    Route::get('/', [SaleBannerController::class, 'index']);
    Route::post('/', [SaleBannerController::class, 'store']);
    Route::post('/{id}', [SaleBannerController::class, 'update']);
    Route::delete('/{id}', [SaleBannerController::class, 'destroy']);
    Route::put('/status/{id}', [SaleBannerController::class, 'updateStatus']);
    Route::put('/bg/{id}', [SaleBannerController::class, 'updateBackground']);
    Route::get('/count', [SaleBannerController::class, 'count']); // Add count route
});

Route::prefix('featuredProduct')->group(function () {
    Route::get('/count', [FeaturedProductController::class, 'count']);  // Ensure this route exists
    Route::get('/', [FeaturedProductController::class, 'index']);
    Route::get('{id}', [FeaturedProductController::class, 'show']);
    Route::post('/', [FeaturedProductController::class, 'store']);
    Route::put('{id}', [FeaturedProductController::class, 'update']);
    Route::delete('{id}', [FeaturedProductController::class, 'destroy']);
});


Route::prefix('products')->group(function () {
        Route::get('/count', [ProductController::class, 'count']); // Add count route
    Route::get('/', [ProductController::class, 'index']); // Get all products
    Route::post('/', [ProductController::class, 'store']); // Add a new product
    Route::get('/{id}', [ProductController::class, 'show']); // Get a specific product
    Route::post('/update/{id}', [ProductController::class, 'update']); // Update a product
    Route::delete('/{id}', [ProductController::class, 'destroy']); // Delete a product

});
