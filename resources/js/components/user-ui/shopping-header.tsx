import { Link } from '@inertiajs/react';
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
                        className="relative flex h-10 w-10 max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-slate-200 text-sm leading-normal font-bold tracking-[0.015em] text-slate-900 transition-colors dark:bg-slate-800 dark:text-slate-200"
                        aria-label="Shopping cart"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
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
