interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
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
    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart(product);
        }
    };

    return (
        <div className="flex flex-col gap-3 rounded-lg bg-white p-4 transition-shadow hover:shadow-lg dark:bg-slate-800/50 dark:hover:shadow-slate-900/50">
            <div className="aspect-square w-full overflow-hidden rounded-lg">
                <img
                    src={product.image}
                    alt={product.imageAlt || product.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                />
            </div>
            <div>
                <p className="product-title">{product.name}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
            </div>
            <button
                className="mt-2 flex h-10 w-full items-center justify-center rounded-lg bg-[#7287fd] px-4 text-sm font-bold text-white transition-all hover:bg-[#7287fd]/90 focus:outline-none focus:ring-2 focus:ring-[#7287fd]/50 dark:bg-[#babbf1] dark:text-slate-900 dark:hover:bg-[#babbf1]/90 dark:focus:ring-[#babbf1]/50"
                onClick={handleAddToCart}
                aria-label={`Add ${product.name} to cart`}
            >
                Add to Cart
            </button>
        </div>
    );
}

export type { Product, ProductCardProps };
