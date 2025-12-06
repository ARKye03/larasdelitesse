import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import products from '@/routes/products';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { AlertTriangle, Package, Star } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    brand: string;
    price: number;
    imageFile: string;
    stock: number;
    rating: number;
}

interface DashboardStats {
    totalProducts: number;
    highRatedProducts: Product[];
    lowStockProducts: Product[];
}

export default function Dashboard({ stats }: { stats: DashboardStats }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Stats Cards */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Total Products Card */}
                    <div className="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400">
                                    Total Products
                                </p>
                                <p className="mt-2 text-3xl font-bold text-white">
                                    {stats.totalProducts}
                                </p>
                            </div>
                            <div className="rounded-full bg-ctp-blue-700/20 p-3">
                                <Package className="h-8 w-8 text-ctp-blue-700" />
                            </div>
                        </div>
                    </div>

                    {/* High Rated Products Card */}
                    <div className="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400">
                                    High Rated (≥4.5)
                                </p>
                                <p className="mt-2 text-3xl font-bold text-white">
                                    {stats.highRatedProducts.length}
                                </p>
                            </div>
                            <div className="rounded-full bg-ctp-yellow-700/20 p-3">
                                <Star className="h-8 w-8 text-ctp-yellow-700" />
                            </div>
                        </div>
                    </div>

                    {/* Low Stock Products Card */}
                    <div className="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-400">
                                    Low Stock (&lt;100)
                                </p>
                                <p className="mt-2 text-3xl font-bold text-white">
                                    {stats.lowStockProducts.length}
                                </p>
                            </div>
                            <div className="rounded-full bg-ctp-red-700/20 p-3">
                                <AlertTriangle className="h-8 w-8 text-ctp-red-700" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Lists */}
                <div className="grid gap-4 md:grid-cols-2">
                    {/* High Rated Products List */}
                    <div className="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50">
                        <div className="border-b border-gray-700 p-4">
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                                <Star className="h-5 w-5 text-ctp-yellow-700" />
                                Top Rated Products
                            </h3>
                        </div>
                        <div className="styled-scrollbar max-h-96 overflow-y-auto p-4">
                            {stats.highRatedProducts.length > 0 ? (
                                <div className="space-y-3">
                                    {stats.highRatedProducts.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={products.show(product.id).url}
                                            className="block rounded-lg border border-gray-700 bg-gray-900/50 p-3 transition-colors hover:border-ctp-yellow-700 hover:bg-gray-900"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-white">
                                                        {product.name}
                                                    </h4>
                                                    <p className="mt-1 text-sm text-gray-400">
                                                        {product.category}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-1 rounded-full bg-ctp-yellow-700/20 px-2 py-1">
                                                    <Star className="h-3 w-3 text-ctp-yellow-700" />
                                                    <span className="text-sm font-medium text-ctp-yellow-700">
                                                        {product.rating}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <Star className="h-12 w-12 text-gray-600" />
                                    <p className="mt-2 text-sm text-gray-400">
                                        No high-rated products yet
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Low Stock Products List */}
                    <div className="relative overflow-hidden rounded-xl border border-gray-700 bg-gray-800/50">
                        <div className="border-b border-gray-700 p-4">
                            <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                                <AlertTriangle className="h-5 w-5 text-ctp-red-700" />
                                Low Stock Alert
                            </h3>
                        </div>
                        <div className="styled-scrollbar max-h-96 overflow-y-auto p-4">
                            {stats.lowStockProducts.length > 0 ? (
                                <div className="space-y-3">
                                    {stats.lowStockProducts.map((product) => (
                                        <Link
                                            key={product.id}
                                            href={products.show(product.id).url}
                                            className="block rounded-lg border border-gray-700 bg-gray-900/50 p-3 transition-colors hover:border-ctp-red-700 hover:bg-gray-900"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-white">
                                                        {product.name}
                                                    </h4>
                                                    <p className="mt-1 text-sm text-gray-400">
                                                        {product.category}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-1 rounded-full bg-ctp-red-700/20 px-2 py-1">
                                                    <Package className="h-3 w-3 text-ctp-red-700" />
                                                    <span className="text-sm font-medium text-ctp-red-700">
                                                        {product.stock}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <Package className="h-12 w-12 text-gray-600" />
                                    <p className="mt-2 text-sm text-gray-400">
                                        All products are well stocked
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
