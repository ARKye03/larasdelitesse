<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AdminUserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('shopping');
})->name('home');

Route::get('shopping', [OrderController::class, 'index'])->name('shopping');
Route::get('shopping/products/{product}', [ProductController::class, 'showShoppingProduct'])->name('shopping.product');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware('admin')->group(function () {
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
        Route::resource('admin/users', AdminUserController::class);
    });

    Route::post('orders', [OrderController::class, 'store'])->name('orders.store');
    Route::get('orders', [OrderController::class, 'show'])->name('orders.show');
});

require __DIR__ . '/settings.php';
