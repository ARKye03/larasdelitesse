import AppLayout from '@/layouts/app-layout';
import users from '@/routes/users';
import { BreadcrumbItem } from '@/types';
import { Button } from '@headlessui/react';
import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: users.index().url,
    },
];
interface User {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
}

export default function AdminUsers({ users: usersList }: { users: User[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold">Users</h1>
                <table className="w-full overflow-hidden rounded-2xl">
                    <thead>
                        <tr className="bg-ctp-red-700 text-white">
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Admin</th>
                            <th className="border p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList.map((user) => (
                            <tr key={user.id}>
                                <td className="border p-2">{user.id}</td>
                                <td className="border p-2">{user.name}</td>
                                <td className="border p-2">{user.email}</td>
                                <td className="border p-2">
                                    {user.is_admin ? 'Yes' : 'No'}
                                </td>
                                <td className="border p-2">
                                    <div className="flex items-center justify-center gap-2">
                                        <Link
                                            as="button"
                                            href={users.edit(user.id).url}
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
                                                        users.destroy(user.id)
                                                            .url,
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
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
