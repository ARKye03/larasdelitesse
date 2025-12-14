import shopping from '@/routes/shopping';
import cart from '@/routes/cart';
import { Link, router, usePage } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    imageFile: string;
    imageAlt?: string;
}

interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
}

export default function ProductCard({
    product,
    onAddToCart,
}: ProductCardProps) {
    const { auth } = usePage().props as any;
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        if (!auth?.user) {
            router.visit('/login');
            return;
        }

        setIsAdding(true);

        router.post(
            cart.add().url,
            { product_id: product.id, quantity: 1 },
            {
                preserveScroll: true,
                onFinish: () => setIsAdding(false),
                onSuccess: () => {
                    if (onAddToCart) {
                        onAddToCart(product);
                    }
                },
            },
        );
    };

    return (
        <div className="flex flex-col gap-3 rounded-lg bg-white p-4 transition-shadow hover:shadow-lg dark:bg-slate-800/50 dark:hover:shadow-slate-900/50">
            <Link href={shopping.product(product.id).url}>
                <div className="aspect-square w-full overflow-hidden rounded-lg">
                    <img
                        src={product.imageFile}
                        alt={product.imageAlt || product.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                </div>
                <div>
                    <p className="product-title truncate">{product.name}</p>
                    <p className="text-sm leading-normal font-normal text-slate-600 dark:text-slate-400">
                        ${product.price.toFixed(2)}
                    </p>
                </div>
            </Link>
            <button
                className="product-card-button"
                onClick={handleAddToCart}
                disabled={isAdding}
                aria-label={`Add ${product.name} to cart`}
            >
                {isAdding ? 'Adding...' : 'Add to Cart'}
                <ShoppingCart className="ml-2" />
            </button>
        </div>
    );
}

export type { Product, ProductCardProps };
