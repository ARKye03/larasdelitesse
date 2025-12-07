import { Link } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import AppLogo from '../app-logo';

interface ShoppingHeaderProps {
    cartItemCount?: number;
}

export default function ShoppingHeader({
    cartItemCount = 0,
}: ShoppingHeaderProps) {
    return (
        <header className="flex items-center justify-between border-b border-solid border-slate-200 px-6 py-4 whitespace-nowrap md:px-10 md:py-3 dark:border-slate-700">
            <div className="flex items-center gap-4 text-slate-900 dark:text-slate-100">
                <AppLogo />
            </div>
            <div className="flex flex-1 items-center justify-end gap-4 md:gap-8">
                <nav className="hidden items-center gap-9 md:flex">
                    <Link
                        href="/shopping"
                        className="text-sm font-medium transition-colors hover:text-[#7287fd] dark:hover:text-[#babbf1]"
                    >
                        Home
                    </Link>
                </nav>
                <div className="flex gap-2">
                    <button
                        className="relative flex h-10 w-10 max-w-[480px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-slate-200 text-sm leading-normal font-bold tracking-[0.015em] text-slate-900 transition-colors dark:bg-slate-800 dark:text-slate-200"
                        aria-label="Shopping cart"
                    >
                        <ShoppingCart />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#7287fd] text-xs font-bold text-white dark:bg-[#babbf1] dark:text-slate-900">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
