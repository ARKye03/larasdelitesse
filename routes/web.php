<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $totalProducts = \App\Models\Product::count();
        $highRatedProducts = \App\Models\Product::where('rating', '>', 4.5)->get();
        $lowStockProducts = \App\Models\Product::where('stock', '<', 100)->get();

        return Inertia::render('dashboard', [
            'stats' => [
                'totalProducts' => $totalProducts,
                'highRatedProducts' => $highRatedProducts,
                'lowStockProducts' => $lowStockProducts,
            ],
        ]);
    })->name('dashboard');

    Route::resource('products', ProductController::class);
});

require __DIR__ . '/settings.php';
