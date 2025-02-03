<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SaleBannerController;
use App\Http\Controllers\FeaturedProductController;
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');  


Route::prefix('saleBanner')->group(function () {
    Route::get('/', [SaleBannerController::class, 'index']);
    Route::post('/', [SaleBannerController::class, 'store']);
    Route::put('/{id}', [SaleBannerController::class, 'update']);
    Route::delete('/{id}', [SaleBannerController::class, 'destroy']);
});

Route::prefix('featuredProduct')->group(function () {
    Route::get('/', [FeaturedProductController::class, 'index']);
    Route::get('{id}', [FeaturedProductController::class, 'show']);
    Route::post('/', [FeaturedProductController::class, 'store']);
    Route::put('{id}', [FeaturedProductController::class, 'update']);
    Route::delete('{id}', [FeaturedProductController::class, 'destroy']);
});