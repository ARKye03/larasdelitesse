import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CirclePlus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

export default function Products() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Link
                    as="button"
                    href={route('products.create')}
                    className="flex items-center gap-2"
                >
                    <CirclePlus />
                </Link>
                <table className="overflow-hidden rounded-2xl">
                    <thead>
                        <tr className="bg-sky-900 text-white">
                            <th className="border p-2">#</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Description</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Image</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Stock</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border p-2">1</td>
                            <td className="border p-2">
                                Gigantosaurus Pro Max
                            </td>
                            <td className="border p-2">
                                Gigantosaurus Pro Max is the best product
                            </td>
                            <td className="border p-2">$100</td>
                            <td className="border p-2">Image 1</td>
                            <td className="border p-2">2025-12-03</td>
                            <td className="border p-2">10</td>
                            <td className="border p-2">
                                <button className="bg-sky-900 px-2 py-1 text-white">
                                    Edit
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
