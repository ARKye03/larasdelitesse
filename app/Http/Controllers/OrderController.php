<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $productsList = Product::latest()->paginate(12)->through(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'imageFile' => $product->imageFile ? asset('storage/' . $product->imageFile) : null,
                'rating' => $product->rating,
            ];
        });
        return Inertia::render('shopping/index', [
            'productsList' => $productsList,
        ]);
    }

    // public function cartIndex()
    // {
    //     return Inertia::render('shopping/cart', [
    //         'cartItems' => $cartItems,
    //     ]);
    // }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $cart = Order::where('user_id', auth()->id())
            ->where('status', 'pending')
            ->first();

        if (!$cart || $cart->items()->count() === 0) {
            return redirect()->back()->with('error', 'Your cart is empty!');
        }

        $cart->status = 'completed';
        $cart->save();

        return redirect()->route('orders.show')->with('success', 'Order placed successfully!');
    }

    public function show()
    {
        $orders = Order::where('user_id', auth()->id())
            ->where('status', 'completed')
            ->with('items.product')
            ->latest()
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->id,
                    'total_amount' => $order->total_amount,
                    'created_at' => $order->created_at->format('M d, Y'),
                    'items' => $order->items->map(function ($item) {
                        return [
                            'product_name' => $item->product->name,
                            'quantity' => $item->quantity,
                            'price' => $item->price,
                            'subtotal' => $item->price * $item->quantity,
                        ];
                    }),
                ];
            });

        return Inertia::render('shopping/orders', [
            'orders' => $orders,
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
