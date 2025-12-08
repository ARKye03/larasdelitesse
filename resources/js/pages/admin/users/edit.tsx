import InputError from '@/components/input-error';
import { ToggleSwitch } from '@/components/toggle-switch';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import users from '@/routes/users';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle } from 'lucide-react';

interface EditProps {
    user: User;
}
interface User {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    created_at: string;
    updated_at: string;
}

export default function EditUser({ user }: EditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: users.index().url,
        },
        {
            title: user.name,
            href: users.show(user.id).url,
        },
    ];

    const { data, setData, post, processing, errors, reset } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        is_admin: user?.is_admin || false,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(users.update(user.id).url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`User: ${user.name}`} />
            <div className="p-4">
                <Link
                    as="button"
                    href={users.index().url}
                    className="ml-auto flex gap-3 rounded-sm p-2 transition-colors duration-200 hover:bg-gray-800"
                >
                    <ArrowLeft />
                    Back to Users
                </Link>
                <Card>
                    <CardHeader>
                        <CardTitle>Edit User</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4"
                            autoComplete="off"
                        >
                            <div className="grid gap-4">
                                {/* Name */}
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="User Name"
                                        autoFocus
                                        tabIndex={1}
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Email */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="User Email"
                                        tabIndex={2}
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {/* Is Admin */}
                                <div className="grid gap-2">
                                    <div className="flex-col items-center gap-2">
                                        <Label htmlFor="is_admin">
                                            Is Admin
                                        </Label>
                                        <ToggleSwitch
                                            id="is_admin"
                                            name="is_admin"
                                            checked={data.is_admin}
                                            onChange={(e) =>
                                                setData(
                                                    'is_admin',
                                                    e.target.checked,
                                                )
                                            }
                                            className="mr-2"
                                            tabIndex={3}
                                        />
                                    </div>
                                    <InputError message={errors.is_admin} />
                                </div>

                                {/* Submit */}
                                <div className="grid gap-2">
                                    <Button
                                        type="submit"
                                        className="w-fit cursor-pointer"
                                        tabIndex={4}
                                    >
                                        {processing && (
                                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        {processing ? 'Updating...' : 'Update'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
