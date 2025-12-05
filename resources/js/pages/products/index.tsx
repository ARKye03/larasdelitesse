import FlashMessage from '@/components/flash-message';
import AppLayout from '@/layouts/app-layout';
import products from '@/routes/products';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CirclePlus } from 'lucide-react';

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
    price: number;
    imageFile: string;
    created_at: string;
    updated_at: string;
    stock: number;
}

export default function Index({ ...props }: { productsList: Product[] }) {
    const { productsList } = props;
    // console.log(productsList[0]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <FlashMessage />
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
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Image</th>
                            <th className="border p-2">Created At</th>
                            <th className="border p-2">Updated At</th>
                            <th className="border p-2">Stock</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productsList.map((itemProduct, index) => (
                            <tr key={index}>
                                <td className="border p-2">{index + 1}</td>
                                <td className="border p-2">
                                    {itemProduct.name}
                                </td>
                                <td className="border p-2">
                                    {itemProduct.description}
                                </td>
                                <td className="border p-2">
                                    {itemProduct.price}
                                </td>
                                <td className="border p-2">
                                    <div className="flex items-center justify-center">
                                        <img
                                            src={itemProduct.imageFile}
                                            alt={itemProduct.name}
                                            className="h-10 w-10 rounded object-cover"
                                        />
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
                                    <div className="flex items-center justify-center">
                                        <button className="rounded bg-ctp-red-700 px-2 py-1 text-white">
                                            Edit
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
