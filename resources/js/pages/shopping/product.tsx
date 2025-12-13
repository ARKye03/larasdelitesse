import { ShoppingLayout } from '@/layouts/shopping-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ShoppingCart, Star, Tag } from 'lucide-react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    category?: string;
    brand?: string;
    price: number;
    imageFile: string;
    rating?: number;
}

interface ProductPageProps {
    product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const handleAddToCart = () => {
        setCartItems((prev) => [...prev, product]);
        // TODO: Implement actual cart functionality
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    return (
        <ShoppingLayout cartItems={cartItems}>
            <Head title={product.name} />
            <main className="p-4 md:p-6 lg:p-8">
                <div className="mx-auto max-w-6xl">
                    {/* Back Button */}
                    <Link
                        href="/shopping"
                        className="mb-6 inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Products</span>
                    </Link>

                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Product Image */}
                        <div className="aspect-square w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                            <img
                                src={product.imageFile}
                                alt={product.name}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col gap-6">
                            {/* Product Name & Rating */}
                            <div>
                                <h1 className="mb-2 text-4xl font-black tracking-[-0.033em] text-slate-900 dark:text-slate-100">
                                    {product.name}
                                </h1>
                                {product.rating && (
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                            <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                                                {product.rating.toFixed(1)}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Price */}
                            <div>
                                <p className="text-4xl font-bold text-purple-600 dark:text-purple-400">
                                    {formatPrice(product.price)}
                                </p>
                            </div>

                            {/* Category & Brand */}
                            {(product.category || product.brand) && (
                                <div className="flex flex-wrap gap-3">
                                    {product.category && (
                                        <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 dark:bg-slate-800">
                                            <Tag className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                {product.category}
                                            </span>
                                        </div>
                                    )}
                                    {product.brand && (
                                        <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 dark:bg-slate-800">
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                                {product.brand}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Description */}
                            {product.description && (
                                <div>
                                    <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-slate-100">
                                        Description
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                                aria-label={`Add ${product.name} to cart`}
                            >
                                <ShoppingCart className="h-5 w-5" />
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </ShoppingLayout>
    );
}

