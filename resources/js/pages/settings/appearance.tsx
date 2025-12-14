import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import SettingsNav from '@/components/user-ui/settings-nav';
import { ShoppingLayout } from '@/layouts/shopping-layout';

export default function Appearance() {
    return (
        <ShoppingLayout cartItems={[]}>
            <Head title="Appearance Settings" />
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

                    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <div className="border-b border-slate-200 p-6 dark:border-slate-700">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                Appearance Settings
                            </h2>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                Update your account's appearance settings
                            </p>
                        </div>
                        <div className="p-6">
                            <AppearanceTabs />
                        </div>
                    </div>
                </div>
            </main>
        </ShoppingLayout>
    );
}
