import { Link } from '@inertiajs/react';

interface ShoppingHeaderProps {
    cartItemCount?: number;
}

export default function ShoppingHeader({
    cartItemCount = 0,
}: ShoppingHeaderProps) {
    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 px-6 py-4 md:px-10 md:py-3 dark:border-slate-700">
            <div className="flex items-center gap-4 text-slate-900 dark:text-slate-100">
                <div className="size-6 text-[#7287fd] dark:text-[#babbf1]">
                    <svg
                        fill="none"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
                <h2 className="text-lg font-bold tracking-[-0.015em]">
                    E-Commerce
                </h2>
            </div>
            <div className="flex flex-1 items-center justify-end gap-4 md:gap-8">
                <nav className="hidden items-center gap-9 md:flex">
                    <Link
                        href="/"
                        className="text-sm font-medium transition-colors hover:text-[#7287fd] dark:hover:text-[#babbf1]"
                    >
                        Home
                    </Link>
                    <Link
                        href="#"
                        className="text-sm font-medium transition-colors hover:text-[#7287fd] dark:hover:text-[#babbf1]"
                    >
                        Shopping Cart
                    </Link>
                </nav>
                <div className="flex gap-2">
                    <button
                        className="relative flex h-10 w-10 max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-slate-200 text-sm font-bold leading-normal tracking-[0.015em] text-slate-900 transition-colors dark:bg-slate-800 dark:text-slate-200"
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
                            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#7287fd] text-xs font-bold text-white dark:bg-[#babbf1] dark:text-slate-900">
                                {cartItemCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
