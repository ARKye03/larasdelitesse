import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { usePage } from '@inertiajs/react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FlashMessage() {
    const { flash } = usePage<{
        flash: { success?: string; error?: string };
    }>().props;

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (flash?.success || flash?.error) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [flash]);

    if (!flash?.success && !flash?.error) {
        return null;
    }

    if (!visible) {
        return null;
    }

    const isSuccess = !!flash.success;
    const message = flash.success || flash.error;

    return (
        <Alert
            variant={isSuccess ? 'default' : 'destructive'}
            className={
                isSuccess
                    ? 'border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950 dark:text-green-100'
                    : ''
            }
        >
            {isSuccess ? (
                <CheckCircle2 className="h-4 w-4" />
            ) : (
                <XCircle className="h-4 w-4" />
            )}
            <AlertTitle>{isSuccess ? 'Success' : 'Error'}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    );
}
