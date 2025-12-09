import ProductCard, { Product } from '@/components/user-ui/product-card';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { ShoppingLayout } from '@/layouts/shopping-layout';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedResponse<T> {
    data: T[];
    links: PaginationLink[];
}

export default function Index({
    ...props
}: {
    productsList: PaginatedResponse<Product>;
}) {
    const { productsList } = props;
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const handleAddToCart = (product: Product) => {
        setCartItems((prev) => [...prev, product]);
    };

    return (
        <ShoppingLayout cartItems={cartItems}>
            <Head title="Shopping" />
            <main className="p-4 md:p-6 lg:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-4 p-4">
                    <h1 className="min-w-72 text-4xl font-black tracking-[-0.033em] text-slate-900 dark:text-slate-100">
                        Our Products
                    </h1>
                </div>

                <div className="shopping-grid">
                    {productsList.data.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>

                <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {productsList.links.map((link, i) =>
                        link.url ? (
                            <Link
                                key={i}
                                href={link.url}
                                className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${link.active
                                        ? 'border-purple-600 bg-purple-600 text-white'
                                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                                    }`}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        ) : (
                            <span
                                key={i}
                                className="rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-600"
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        ),
                    )}
                </div>
            </main>
        </ShoppingLayout>
    );
}
