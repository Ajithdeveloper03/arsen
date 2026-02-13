<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\PopupController;
use App\Http\Controllers\Api\UniversalFormController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CareerListingController;
use App\Http\Controllers\ContactDetailController;

// Public Routes
Route::middleware('throttle:5,1')->group(function () {
    Route::post('/contact', [ContactController::class, 'send']);
    Route::post('/popup', [PopupController::class, 'send']);
    Route::post('/submit-form', [UniversalFormController::class, 'submit']);
});

Route::get('/public/banners', [BannerController::class, 'index']);
Route::get('/public/projects', [ProjectController::class, 'index']);
Route::get('/public/careers', [CareerListingController::class, 'index']);
Route::get('/public/contact-details', [ContactDetailController::class, 'index']);

// Auth Routes
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected Admin Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

    Route::apiResource('banners', BannerController::class);
    Route::apiResource('projects', ProjectController::class);
    Route::apiResource('careers', CareerListingController::class);
    Route::apiResource('contact-details', ContactDetailController::class);
    
    // Manual Update for some cases if needed (e.g. for uploads needing POST)
    Route::post('banners/{banner}', [BannerController::class, 'update']);
    Route::post('projects/{project}', [ProjectController::class, 'update']);
    Route::post('careers/{career}', [CareerListingController::class, 'update']);
});