import { FiltersIndex } from '@/components/filters-index';
import FlashMessage from '@/components/flash-message';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import products from '@/routes/products';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Annoyed, CirclePlus, Eye, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: products.index().url,
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
    created_at: string;
    updated_at: string;
    stock: number;
    rating: number;
}

export default function Index({ ...props }: { productsList: Product[] }) {
    const { productsList } = props;
    const [filteredProducts, setFilteredProducts] =
        useState<Product[]>(productsList);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <FlashMessage />

                <FiltersIndex
                    productsList={productsList}
                    onFilterChange={setFilteredProducts}
                />

                <div className="ml-auto">
                    <Link
                        as="button"
                        href={products.create().url}
                        className="rounded-sm p-2 transition-colors duration-200 hover:bg-gray-800"
                    >
                        <CirclePlus />
                    </Link>
                </div>
                <table className="overflow-hidden rounded-2xl">
                    <thead>
                        <tr className="bg-ctp-red-700 text-white">
                            <th className="border p-2">#</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Description</th>
                            <th className="border p-2">Category</th>
                            <th className="border p-2">Brand</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Image</th>
                            <th className="border p-2">Created</th>
                            <th className="border p-2">Updated</th>
                            <th className="border p-2">Stock</th>
                            <th className="border p-2">Rating</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((itemProduct, index) => (
                                <tr key={index}>
                                    <td className="border p-2">{index + 1}</td>
                                    <td className="border p-2">
                                        {itemProduct.name}
                                    </td>
                                    <td className="border p-2">
                                        {itemProduct.description}
                                    </td>
                                    <td className="border p-2">
                                        {itemProduct.category}
                                    </td>
                                    <td className="border p-2">
                                        {itemProduct.brand}
                                    </td>
                                    <td className="border p-2">
                                        {itemProduct.price}
                                    </td>
                                    <td className="border p-2">
                                        <div className="flex items-center justify-center">
                                            {itemProduct.imageFile && (
                                                <img
                                                    src={itemProduct.imageFile}
                                                    alt={itemProduct.name}
                                                    className="h-10 w-10 rounded object-cover"
                                                />
                                            )}
                                        </div>
                                    </td>
                                    <td className="border p-2">
                                        {itemProduct.created_at}
                                    </td>
                                    <td className="border p-2">
                                        {itemProduct.updated_at}
                                    </td>
                                    <td className="border p-2">
                                        {itemProduct.stock}
                                    </td>
                                    <td className="border p-2">
                                        {itemProduct.rating}
                                    </td>
                                    <td className="border p-2">
                                        <div className="flex items-center justify-center gap-2">
                                            <Link
                                                as="button"
                                                href={
                                                    products.show(
                                                        itemProduct.id,
                                                    ).url
                                                }
                                                className="cursor-pointer rounded bg-ctp-green-700 px-2 py-1 text-white transition-opacity duration-200 hover:opacity-90"
                                            >
                                                <Eye />
                                            </Link>

                                            <Link
                                                as="button"
                                                href={
                                                    products.edit(
                                                        itemProduct.id,
                                                    ).url
                                                }
                                                className="cursor-pointer rounded bg-ctp-sapphire-700 px-2 py-1 text-white transition-opacity duration-200 hover:opacity-90"
                                            >
                                                <Pencil />
                                            </Link>
                                            <Button
                                                className="cursor-pointer rounded bg-ctp-red-700 px-2 py-1 text-white transition-opacity duration-200 hover:bg-ctp-red-700 hover:opacity-90"
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            'Are you sure you want to delete this product?',
                                                        )
                                                    ) {
                                                        router.delete(
                                                            products.destroy(
                                                                itemProduct.id,
                                                            ).url,
                                                            {
                                                                preserveScroll: true,
                                                            },
                                                        );
                                                    }
                                                }}
                                            >
                                                <Trash />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={9} className="border-0 p-12">
                                    <div className="flex flex-col items-center justify-center gap-4 text-center">
                                        <Annoyed className="text-ctp-overlay0-500 h-16 w-16" />
                                        <div className="space-y-2">
                                            <h3 className="text-ctp-text-100 text-xl font-semibold">
                                                No products found
                                            </h3>
                                            <p className="text-ctp-subtext0-400 text-sm">
                                                Get started by creating your
                                                first product
                                            </p>
                                        </div>
                                        <Link
                                            as="button"
                                            href={products.create().url}
                                            className="flex items-center gap-2 rounded-lg bg-ctp-red-700 px-4 py-2 text-white transition-opacity duration-200 hover:opacity-90"
                                        >
                                            <CirclePlus className="h-4 w-4" />
                                            <span>Create Product</span>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
