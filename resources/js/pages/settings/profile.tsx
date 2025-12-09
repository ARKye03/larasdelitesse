import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { send } from '@/routes/verification';
import { type User } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link } from '@inertiajs/react';

import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';
import SettingsNav from '@/components/user-ui/settings-nav';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingLayout } from '@/layouts/shopping-layout';
import { Calendar, Mail, Shield, User as UserIcon } from 'lucide-react';

export default function Profile({
    user,
    mustVerifyEmail,
    status,
}: {
    user: User;
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Not verified';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <ShoppingLayout cartItems={[]}>
            <Head title="Profile Settings" />
            <main className="p-4 md:p-6 lg:p-8">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-8">
                        <h1 className="text-4xl font-black tracking-[-0.033em] text-slate-900 dark:text-slate-100">
                            Settings
                        </h1>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">
                            Manage your profile and account settings
                        </p>
                    </div>

                    <SettingsNav />

                    {/* Profile Information Display */}
                    <div className="mb-8 rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div className="border-b border-slate-200 p-6 dark:border-slate-700">
                            <div className="flex items-center gap-4">
                                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-2xl font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span>{user.name.charAt(0).toUpperCase()}</span>
                                    )}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                        {user.name}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        Account Information
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="space-y-6">
                                {/* Email */}
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
                                        <Mail className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                            Email Address
                                        </p>
                                        <p className="mt-1 text-base text-slate-900 dark:text-slate-100">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Email Verification Status */}
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
                                        <Shield className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                            Email Verification
                                        </p>
                                        <p className="mt-1 text-base text-slate-900 dark:text-slate-100">
                                            {user.email_verified_at ? (
                                                <span className="inline-flex items-center gap-2">
                                                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                                    Verified on{' '}
                                                    {formatDate(user.email_verified_at)}
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-2">
                                                    <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                                                    Not verified
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>

                                {/* Two-Factor Authentication */}
                                {user.two_factor_enabled !== undefined && (
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
                                            <Shield className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                                Two-Factor Authentication
                                            </p>
                                            <p className="mt-1 text-base text-slate-900 dark:text-slate-100">
                                                {user.two_factor_enabled ? (
                                                    <span className="inline-flex items-center gap-2">
                                                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                                                        Enabled
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-2">
                                                        <span className="h-2 w-2 rounded-full bg-gray-500"></span>
                                                        Disabled
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Account Created */}
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
                                        <Calendar className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                            Member Since
                                        </p>
                                        <p className="mt-1 text-base text-slate-900 dark:text-slate-100">
                                            {formatDate(user.created_at)}
                                        </p>
                                    </div>
                                </div>

                                {/* User ID */}
                                <div className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-700">
                                        <UserIcon className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                            User ID
                                        </p>
                                        <p className="mt-1 text-base text-slate-900 dark:text-slate-100">
                                            #{user.id}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Edit Form */}
                    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div className="border-b border-slate-200 p-6 dark:border-slate-700">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                Profile Information
                            </h2>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                Update your name and email address
                            </p>
                        </div>

                        <div className="p-6">
                            <div className="space-y-6">

                                <Form
                                    {...ProfileController.update.form()}
                                    options={{
                                        preserveScroll: true,
                                    }}
                                    className="space-y-6"
                                >
                                    {({ processing, recentlySuccessful, errors }) => (
                                        <>
                                            <div className="grid gap-2">
                                                <Label htmlFor="name">Name</Label>

                                                <Input
                                                    id="name"
                                                    className="mt-1 block w-full"
                                                    defaultValue={user.name}
                                                    name="name"
                                                    required
                                                    autoComplete="name"
                                                    placeholder="Full name"
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={errors.name}
                                                />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Email address</Label>

                                                <Input
                                                    id="email"
                                                    type="email"
                                                    className="mt-1 block w-full"
                                                    defaultValue={user.email}
                                                    name="email"
                                                    required
                                                    autoComplete="username"
                                                    placeholder="Email address"
                                                />

                                                <InputError
                                                    className="mt-2"
                                                    message={errors.email}
                                                />
                                            </div>

                                            {mustVerifyEmail &&
                                                user.email_verified_at === null && (
                                                    <div>
                                                        <p className="-mt-4 text-sm text-slate-600 dark:text-slate-400">
                                                            Your email address is
                                                            unverified.{' '}
                                                            <Link
                                                                href={send()}
                                                                as="button"
                                                                className="text-purple-600 underline decoration-purple-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current dark:text-purple-400 dark:decoration-purple-500"
                                                            >
                                                                Click here to resend the
                                                                verification email.
                                                            </Link>
                                                        </p>

                                                        {status ===
                                                            'verification-link-sent' && (
                                                                <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                                                    A new verification link has
                                                                    been sent to your email
                                                                    address.
                                                                </div>
                                                            )}
                                                    </div>
                                                )}

                                            <div className="flex items-center gap-4">
                                                <Button
                                                    disabled={processing}
                                                    data-test="update-profile-button"
                                                    className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                                                >
                                                    Save
                                                </Button>

                                                <Transition
                                                    show={recentlySuccessful}
                                                    enter="transition ease-in-out"
                                                    enterFrom="opacity-0"
                                                    leave="transition ease-in-out"
                                                    leaveTo="opacity-0"
                                                >
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                                        Saved
                                                    </p>
                                                </Transition>
                                            </div>
                                        </>
                                    )}
                                </Form>
                            </div>
                        </div>
                    </div>

                    <DeleteUser />
                </div>
            </main>
        </ShoppingLayout>
    );
}
