import { Head, router } from '@inertiajs/react';
import { ShoppingLayout } from '@/layouts/shopping-layout';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import cart from '@/routes/cart';
import { shopping } from '@/routes';

interface CartItem {
    id: number;
    product_id: number;
    product_name: string;
    product_image: string | null;
    price: number;
    quantity: number;
    subtotal: number;
}

interface CartProps {
    cartItems: CartItem[];
    total: number;
}

export default function Cart({ cartItems, total }: CartProps) {
    const [updatingItems, setUpdatingItems] = useState<Set<number>>(new Set());

    const updateQuantity = (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        setUpdatingItems((prev) => new Set(prev).add(itemId));

        router.patch(
            cart.update(itemId).url,
            { quantity: newQuantity },
            {
                preserveScroll: true,
                onFinish: () => {
                    setUpdatingItems((prev) => {
                        const next = new Set(prev);
                        next.delete(itemId);
                        return next;
                    });
                },
            },
        );
    };

    const removeItem = (itemId: number) => {
        if (!confirm('Remove this item from your cart?')) return;

        router.delete(cart.remove(itemId).url, {
            preserveScroll: true,
        });
    };

    const clearCart = () => {
        if (!confirm('Clear all items from your cart?')) return;

        router.delete(cart.clear().url, {
            preserveScroll: true,
        });
    };

    const checkout = () => {
        router.post(
            '/orders',
            {},
            {
                onSuccess: () => {
                    router.visit('/orders');
                },
            },
        );
    };

    if (cartItems.length === 0) {
        return (
            <ShoppingLayout>
                <Head title="Shopping Cart" />
                <main className="flex min-h-[60vh] flex-col items-center justify-center p-8">
                    <div className="text-center">
                        <ShoppingBag className="mx-auto mb-6 h-24 w-24 text-slate-300 dark:text-slate-700" />
                        <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100">
                            Your cart is empty
                        </h1>
                        <p className="mb-8 text-slate-600 dark:text-slate-400">
                            Add some delicious items to get started!
                        </p>
                        <a
                            href={shopping.get().url}
                            className="product-card-button inline-flex"
                        >
                            Continue Shopping
                            <ArrowRight />
                        </a>
                    </div>
                </main>
            </ShoppingLayout>
        );
    }

    return (
        <ShoppingLayout>
            <Head title="Shopping Cart" />
            <main className="p-4 md:p-6 lg:p-8">
                <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
                    <h1 className="text-4xl font-black tracking-[-0.033em] text-slate-900 dark:text-slate-100">
                        Shopping Cart
                    </h1>
                    {cartItems.length > 0 && (
                        <button
                            onClick={clearCart}
                            className="text-sm font-medium text-red-600 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                            Clear Cart
                        </button>
                    )}
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-slate-800/50"
                                >
                                    <div className="flex gap-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-700">
                                            {item.product_image ? (
                                                <img
                                                    src={item.product_image}
                                                    alt={item.product_name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <ShoppingBag className="h-8 w-8 text-slate-400" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-1 flex-col justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                                    {item.product_name}
                                                </h3>
                                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                                    ${item.price.toFixed(2)}{' '}
                                                    each
                                                </p>
                                            </div>

                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity -
                                                                    1,
                                                            )
                                                        }
                                                        disabled={
                                                            item.quantity <=
                                                                1 ||
                                                            updatingItems.has(
                                                                item.id,
                                                            )
                                                        }
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>

                                                    <span className="min-w-[2rem] text-center text-lg font-semibold text-slate-900 dark:text-slate-100">
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.id,
                                                                item.quantity +
                                                                    1,
                                                            )
                                                        }
                                                        disabled={updatingItems.has(
                                                            item.id,
                                                        )}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                                        $
                                                        {item.subtotal.toFixed(
                                                            2,
                                                        )}
                                                    </p>

                                                    <button
                                                        onClick={() =>
                                                            removeItem(item.id)
                                                        }
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                                                        aria-label="Remove item"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 shadow-lg dark:from-slate-800 dark:to-slate-900">
                            <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-slate-100">
                                Order Summary
                            </h2>

                            <div className="space-y-3 border-b border-slate-200 pb-4 dark:border-slate-700">
                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                                    <span>Shipping</span>
                                    <span className="text-green-600 dark:text-green-400">
                                        FREE
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-between text-xl font-bold text-slate-900 dark:text-slate-100">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={checkout}
                                className="product-card-button mt-6 w-full justify-center"
                            >
                                Proceed to Checkout
                                <ArrowRight />
                            </button>

                            <a
                                href={shopping.get().url}
                                className="mt-4 block text-center text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                            >
                                Continue Shopping
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </ShoppingLayout>
    );
}
