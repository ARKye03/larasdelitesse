<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cart = Order::getOrCreateCart(auth()->id());

        $cartItems = $cart->items()->with('product')->get()->map(function ($item) {
            return [
                'id' => $item->id,
                'product_id' => $item->product_id,
                'product_name' => $item->product->name,
                'product_image' => $item->product->imageFile ? asset('storage/' . $item->product->imageFile) : null,
                'price' => $item->price,
                'quantity' => $item->quantity,
                'subtotal' => $item->price * $item->quantity,
            ];
        });

        return Inertia::render('shopping/cart', [
            'cartItems' => $cartItems,
            'total' => $cartItems->sum('subtotal'),
        ]);
    }

    public function addItem(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);
        $cart = Order::getOrCreateCart(auth()->id());

        $existingItem = $cart->items()->where('product_id', $product->id)->first();

        if ($existingItem) {
            $existingItem->quantity += $request->quantity ?? 1;
            $existingItem->save();
        } else {
            OrderItem::create([
                'order_id' => $cart->id,
                'product_id' => $product->id,
                'quantity' => $request->quantity ?? 1,
                'price' => $product->price,
            ]);
        }

        $this->updateCartTotal($cart);

        return redirect()->back()->with('success', 'Item added to cart!');
    }

    public function updateItem(Request $request, OrderItem $item)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        if ($item->order->user_id !== auth()->id()) {
            abort(403);
        }

        $item->quantity = $request->quantity;
        $item->save();

        $this->updateCartTotal($item->order);

        return redirect()->back()->with('success', 'Cart updated!');
    }

    public function removeItem(OrderItem $item)
    {
        if ($item->order->user_id !== auth()->id()) {
            abort(403);
        }

        $cart = $item->order;
        $item->delete();

        $this->updateCartTotal($cart);

        return redirect()->back()->with('success', 'Item removed from cart!');
    }

    public function clear()
    {
        $cart = Order::where('user_id', auth()->id())
            ->where('status', 'pending')
            ->first();

        if ($cart) {
            $cart->items()->delete();
            $cart->total_amount = 0;
            $cart->save();
        }

        return redirect()->back()->with('success', 'Cart cleared!');
    }

    private function updateCartTotal(Order $cart)
    {
        $total = $cart->items()->get()->sum(function ($item) {
            return $item->price * $item->quantity;
        });

        $cart->total_amount = $total;
        $cart->save();
    }
}
