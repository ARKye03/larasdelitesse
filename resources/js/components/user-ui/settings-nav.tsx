import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { show } from '@/routes/two-factor';
import { edit as editPassword } from '@/routes/user-password';
import { type InertiaLinkProps } from '@inertiajs/react';
import { Link, usePage } from '@inertiajs/react';
import { cn, isSameUrl } from '@/lib/utils';

interface SettingsNavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
}

const settingsNavItems: SettingsNavItem[] = [
    {
        title: 'Profile',
        href: edit(),
    },
    {
        title: 'Password',
        href: editPassword(),
    },
    {
        title: 'Two-Factor Auth',
        href: show(),
    },
    {
        title: 'Appearance',
        href: editAppearance(),
    },
];

export default function SettingsNav() {
    const page = usePage();

    return (
        <nav className="mb-8 flex flex-wrap gap-2 border-b border-slate-200 pb-4 dark:border-slate-700">
            {settingsNavItems.map((item) => {
                const isActive = isSameUrl(page.url, item.href);
                return (
                    <Link
                        key={typeof item.href === 'string' ? item.href : item.href.url}
                        href={item.href}
                        className={cn(
                            'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                            isActive
                                ? 'bg-purple-600 text-white dark:bg-purple-500'
                                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700',
                        )}
                    >
                        {item.title}
                    </Link>
                );
            })}
        </nav>
    );
}

