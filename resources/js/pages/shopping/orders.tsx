import { Head } from '@inertiajs/react';
import { ShoppingLayout } from '@/layouts/shopping-layout';
import { Package, ShoppingBag } from 'lucide-react';
import { shopping } from '@/routes';

interface OrderItem {
    product_name: string;
    quantity: number;
    price: number;
    subtotal: number;
}

interface Order {
    id: number;
    total_amount: number;
    created_at: string;
    items: OrderItem[];
}

interface OrdersProps {
    orders: Order[];
}

export default function Orders({ orders }: OrdersProps) {
    if (orders.length === 0) {
        return (
            <ShoppingLayout>
                <Head title="Order History" />
                <main className="flex min-h-[60vh] flex-col items-center justify-center p-8">
                    <div className="text-center">
                        <Package className="mx-auto mb-6 h-24 w-24 text-slate-300 dark:text-slate-700" />
                        <h1 className="mb-4 text-3xl font-bold text-slate-900 dark:text-slate-100">
                            No orders yet
                        </h1>
                        <p className="mb-8 text-slate-600 dark:text-slate-400">
                            Start shopping to see your order history here!
                        </p>
                        <a
                            href={shopping.get().url}
                            className="product-card-button inline-flex"
                        >
                            Start Shopping
                            <ShoppingBag />
                        </a>
                    </div>
                </main>
            </ShoppingLayout>
        );
    }

    return (
        <ShoppingLayout>
            <Head title="Order History" />
            <main className="p-4 md:p-6 lg:p-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-black tracking-[-0.033em] text-slate-900 dark:text-slate-100">
                        Order History
                    </h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                        View and track your previous orders
                    </p>
                </div>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-slate-800/50"
                        >
                            <div className="border-b border-slate-200 bg-gradient-to-r from-purple-50 to-pink-50 p-6 dark:border-slate-700 dark:from-slate-800 dark:to-slate-900">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                            Order #{order.id}
                                        </h2>
                                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                            Placed on {order.created_at}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-slate-600 dark:text-slate-400">
                                            Total
                                        </p>
                                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                            ${order.total_amount.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="mb-4 text-sm font-semibold tracking-wide text-slate-600 uppercase dark:text-slate-400">
                                    Items
                                </h3>
                                <div className="space-y-3">
                                    {order.items.map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between rounded-lg bg-slate-50 p-4 dark:bg-slate-900/50"
                                        >
                                            <div className="flex-1">
                                                <p className="font-medium text-slate-900 dark:text-slate-100">
                                                    {item.product_name}
                                                </p>
                                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                                    ${item.price.toFixed(2)} ×{' '}
                                                    {item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                                ${item.subtotal.toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <a
                        href={shopping.get().url}
                        className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                    >
                        ← Back to Shopping
                    </a>
                </div>
            </main>
        </ShoppingLayout>
    );
}
