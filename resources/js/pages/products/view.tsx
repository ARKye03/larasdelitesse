import AppLayout from '@/layouts/app-layout';
import products from '@/routes/products';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Calendar,
    DollarSign,
    Hash,
    Image as ImageIcon,
    Package,
    Pencil,
    Trash,
} from 'lucide-react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageFile: string;
    created_at: string;
    updated_at: string;
    stock: number;
}

interface ViewProps {
    product: Product;
}

export default function View({ product }: ViewProps) {
    console.log(product);
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(price);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Products',
            href: products.index().url,
        },
        {
            title: product.name,
            href: products.show(product.id).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Product: ${product.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {/* Header with Actions */}
                <div className="flex items-center justify-between">
                    <Link
                        as="button"
                        href={products.index().url}
                        className="text-ctp-text-100 hover:bg-ctp-surface0-800 flex items-center gap-2 rounded-lg px-4 py-2 transition-colors duration-200"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span>Back to Products</span>
                    </Link>

                    <div className="flex gap-2">
                        <Link
                            as="button"
                            href={products.edit(product.id).url}
                            className="flex items-center gap-2 rounded-lg bg-ctp-sapphire-700 px-4 py-2 text-white transition-opacity duration-200 hover:opacity-90"
                        >
                            <Pencil className="h-4 w-4" />
                            <span>Edit</span>
                        </Link>
                        <Link
                            as="button"
                            href={products.destroy(product.id).url}
                            className="flex items-center gap-2 rounded-lg bg-ctp-red-700 px-4 py-2 text-white transition-opacity duration-200 hover:opacity-90"
                        >
                            <Trash className="h-4 w-4" />
                            <span>Delete</span>
                        </Link>
                    </div>
                </div>

                {/* BentoGrid */}
                <div className="grid auto-rows-[minmax(150px,auto)] grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {/* Large Image Card - Spans 2 columns on medium+ screens */}
                    <div className="group relative col-span-1 row-span-2 overflow-hidden rounded-2xl bg-linear-to-br from-ctp-red-700/20 to-ctp-pink-700/20 p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:col-span-2">
                        <div className="bg-ctp-base-900 h-full overflow-hidden rounded-xl">
                            <div className="flex h-full flex-col">
                                <div className="flex items-center gap-2 p-4 pb-2">
                                    <ImageIcon className="h-5 w-5 text-ctp-red-700" />
                                    <h3 className="text-ctp-text-100 text-sm font-semibold">
                                        Product Image
                                    </h3>
                                </div>
                                <div className="relative flex-1 p-4 pt-2">
                                    <img
                                        src={product.imageFile}
                                        alt={product.name}
                                        className="w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="from-ctp-base-900/80 absolute inset-0 rounded-lg bg-linear-to-t via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Name & Description - Spans 2 columns on large screens */}
                    <div className="group relative col-span-1 row-span-2 overflow-hidden rounded-2xl bg-linear-to-br from-ctp-sapphire-700/20 to-ctp-blue-700/20 p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl md:col-span-1 lg:col-span-2">
                        <div className="bg-ctp-base-900 h-full overflow-hidden rounded-xl p-6">
                            <div className="flex h-full flex-col">
                                <div className="flex items-center gap-2 pb-4">
                                    <Package className="h-6 w-6 text-ctp-sapphire-700" />
                                    <h3 className="text-ctp-text-100 text-lg font-bold">
                                        Product Details
                                    </h3>
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <p className="text-ctp-subtext0-400 text-sm font-medium">
                                            Name
                                        </p>
                                        <h2 className="text-ctp-text-100 text-3xl font-bold">
                                            {product.name}
                                        </h2>
                                    </div>
                                    <div>
                                        <p className="text-ctp-subtext0-400 text-sm font-medium">
                                            Description
                                        </p>
                                        <p className="text-ctp-text-100/80 text-base leading-relaxed">
                                            {product.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Price Card */}
                    <div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-ctp-green-700/20 to-ctp-teal-700/20 p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                        <div className="bg-ctp-base-900 h-full overflow-hidden rounded-xl p-6">
                            <div className="flex h-full flex-col justify-between">
                                <div className="flex items-center gap-2">
                                    <DollarSign className="h-5 w-5 text-ctp-green-700" />
                                    <h3 className="text-ctp-text-100 text-sm font-semibold">
                                        Price
                                    </h3>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold text-ctp-green-700">
                                        {formatPrice(product.price)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stock Card */}
                    <div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-ctp-yellow-700/20 to-ctp-peach-700/20 p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                        <div className="bg-ctp-base-900 h-full overflow-hidden rounded-xl p-6">
                            <div className="flex h-full flex-col justify-between">
                                <div className="flex items-center gap-2">
                                    <Hash className="h-5 w-5 text-ctp-yellow-700" />
                                    <h3 className="text-ctp-text-100 text-sm font-semibold">
                                        Stock
                                    </h3>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold text-ctp-yellow-700">
                                        {product.stock}
                                    </p>
                                    <p className="text-ctp-subtext0-400 text-sm">
                                        units available
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ID Card */}
                    <div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-ctp-mauve-700/20 to-ctp-pink-700/20 p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                        <div className="bg-ctp-base-900 h-full overflow-hidden rounded-xl p-6">
                            <div className="flex h-full flex-col justify-between">
                                <div className="flex items-center gap-2">
                                    <Hash className="h-5 w-5 text-ctp-mauve-700" />
                                    <h3 className="text-ctp-text-100 text-sm font-semibold">
                                        Product ID
                                    </h3>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold text-ctp-mauve-700">
                                        #{product.id}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Created At Card */}
                    <div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-ctp-lavender-700/20 to-ctp-blue-700/20 p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                        <div className="bg-ctp-base-900 h-full overflow-hidden rounded-xl p-6">
                            <div className="flex h-full flex-col justify-between">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-ctp-lavender-700" />
                                    <h3 className="text-ctp-text-100 text-sm font-semibold">
                                        Created
                                    </h3>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-ctp-lavender-700">
                                        {formatDate(product.created_at)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Updated At Card */}
                    <div className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-ctp-sky-700/20 to-ctp-sapphire-700/20 p-1 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                        <div className="bg-ctp-base-900 h-full overflow-hidden rounded-xl p-6">
                            <div className="flex h-full flex-col justify-between">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-ctp-sky-700" />
                                    <h3 className="text-ctp-text-100 text-sm font-semibold">
                                        Last Updated
                                    </h3>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-ctp-sky-700">
                                        {formatDate(product.updated_at)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
