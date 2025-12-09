import { Product } from '@/components/user-ui/product-card';
import ShoppingHeader from '@/components/user-ui/shopping-header';

interface HeaderProps {
    children: React.ReactNode;
    cartItems: Product[];
}

export const ShoppingLayout = ({ children, cartItems }: HeaderProps) => {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <div className="flex flex-1 justify-center px-4 py-5 sm:px-8 md:px-16 lg:px-24 xl:px-40">
                    <div className="layout-content-container flex max-w-[1200px] flex-1 flex-col">
                        <ShoppingHeader cartItemCount={cartItems.length} />
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
