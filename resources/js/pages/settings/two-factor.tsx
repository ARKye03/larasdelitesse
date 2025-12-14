import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import SettingsNav from '@/components/user-ui/settings-nav';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import { ShoppingLayout } from '@/layouts/shopping-layout';
import { disable, enable } from '@/routes/two-factor';
import { Form, Head } from '@inertiajs/react';
import { ShieldBan, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

interface TwoFactorProps {
    requiresConfirmation?: boolean;
    twoFactorEnabled?: boolean;
}

export default function TwoFactor({
    requiresConfirmation = false,
    twoFactorEnabled = false,
}: TwoFactorProps) {
    const {
        qrCodeSvg,
        hasSetupData,
        manualSetupKey,
        clearSetupData,
        fetchSetupData,
        recoveryCodesList,
        fetchRecoveryCodes,
        errors,
    } = useTwoFactorAuth();
    const [showSetupModal, setShowSetupModal] = useState<boolean>(false);

    return (
        <ShoppingLayout cartItems={[]}>
            <Head title="Two-Factor Authentication" />
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
                                Two-Factor Authentication
                            </h2>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                Manage your two-factor authentication settings
                            </p>
                        </div>

                        <div className="p-6">
                            <div className="space-y-6">
                                {twoFactorEnabled ? (
                                    <div className="flex flex-col items-start justify-start space-y-4">
                                        <Badge variant="default">Enabled</Badge>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            With two-factor authentication enabled, you will
                                            be prompted for a secure, random pin during
                                            login, which you can retrieve from the
                                            TOTP-supported application on your phone.
                                        </p>

                                        <TwoFactorRecoveryCodes
                                            recoveryCodesList={recoveryCodesList}
                                            fetchRecoveryCodes={fetchRecoveryCodes}
                                            errors={errors}
                                        />

                                        <div className="relative inline">
                                            <Form {...disable.form()}>
                                                {({ processing }) => (
                                                    <Button
                                                        variant="destructive"
                                                        type="submit"
                                                        disabled={processing}
                                                    >
                                                        <ShieldBan /> Disable 2FA
                                                    </Button>
                                                )}
                                            </Form>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-start justify-start space-y-4">
                                        <Badge variant="destructive">Disabled</Badge>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            When you enable two-factor authentication, you
                                            will be prompted for a secure pin during login.
                                            This pin can be retrieved from a TOTP-supported
                                            application on your phone.
                                        </p>

                                        <div>
                                            {hasSetupData ? (
                                                <Button
                                                    onClick={() => setShowSetupModal(true)}
                                                    className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                                                >
                                                    <ShieldCheck />
                                                    Continue Setup
                                                </Button>
                                            ) : (
                                                <Form
                                                    {...enable.form()}
                                                    onSuccess={() =>
                                                        setShowSetupModal(true)
                                                    }
                                                >
                                                    {({ processing }) => (
                                                        <Button
                                                            type="submit"
                                                            disabled={processing}
                                                            className="bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
                                                        >
                                                            <ShieldCheck />
                                                            Enable 2FA
                                                        </Button>
                                                    )}
                                                </Form>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <TwoFactorSetupModal
                                    isOpen={showSetupModal}
                                    onClose={() => setShowSetupModal(false)}
                                    requiresConfirmation={requiresConfirmation}
                                    twoFactorEnabled={twoFactorEnabled}
                                    qrCodeSvg={qrCodeSvg}
                                    manualSetupKey={manualSetupKey}
                                    clearSetupData={clearSetupData}
                                    fetchSetupData={fetchSetupData}
                                    errors={errors}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </ShoppingLayout>
    );
}
