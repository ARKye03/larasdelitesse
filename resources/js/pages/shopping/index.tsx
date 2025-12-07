import ProductCard, { Product } from '@/components/user-ui/product-card';
import ShoppingHeader from '@/components/user-ui/shopping-header';
import { useState } from 'react';

// Mock product data - this will be replaced with real data from the backend
const MOCK_PRODUCTS: Product[] = [
    {
        id: 1,
        name: 'Sport Performance Sneaker',
        price: 120.0,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBsB-aAK_bL65Pr3PITmCM0ctNvJrjQCUnlc-Iur6YqujwXKTnniaU5f6TwvWlrDH3Qf9CgXDp8vidYKd4EM2UQ9JeuivaeGbUAXTDSIKhVMEteBmU2b5GWdKTOTOuDDloB7fwmENu-Ki4njPhTROdDDn_OzIlqJEK_RtDRtckJ7v81HY_u5HkjgV9sJIrpkCOtmVDMOLLIPAtf66cpZL9li5EBNxvSjNUDehuuwEytewB3kMf9yJkH_qjcPfqeJNEkhiRvMEeF__G',
        imageAlt:
            'A pair of red and white running shoes on a plain background.',
    },
    {
        id: 2,
        name: 'Noise-Cancelling Headphones',
        price: 249.0,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJo88KlJepyfZR2YaWkX3CIERhozWfJLM0lse-AgowAeD3p6pe1dq7-IJ_x2sA8lISJbeYGskQcOnhuAwzXYFThPSVHSHYLdqjQdq9KVVYxX-zgcJ5XzZX3-rfZTbrBCrAU9YM2zHx6fSk8VS6nhWpXhVY8QIiR9sZfsVaxI5i_Llts3T7Q3ReIkQE4zhYcbo8mp1x0GpDDDpWB0WV9urGh_X1MQxe8uz1HgsVvgwT1MLvWc1MBJ8a_mz0YjJHLqHrCWcSnGXQy2Ep',
        imageAlt: 'Black wireless over-ear headphones on a yellow background.',
    },
    {
        id: 3,
        name: 'Classic Leather Watch',
        price: 450.0,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbMLUqmLm_B4RncM9LmL5jOntwPCZHPX6pO2X0Ohmih6xwttrJ1q-kbBxPIP0-t0jWSLQKJrq0k9o6g8i0bUHughcg32PXK3nase79YnC1i9KztZxPcm6T7a6TNciwAf0W6DSJ6D92WuLdP4eDG6radsBPPk9iIjA7muy5_x_Wa24lQz1AZQoyp016gfbNbA4QWfQwDI2e6RxjNTLOANQnIQQjcTmB1_h93QNFXfJqAb4TimfNwe-N4TYYROsEAWdLHNirURl77R7G',
        imageAlt: 'A classic analog wristwatch with a brown leather strap.',
    },
    {
        id: 4,
        name: 'Minimalist Ceramic Vase',
        price: 35.5,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBG7tPrfLALoEKHg7q17h0p9UEphpVrZ191JiTSAvYRMKzS_Fh2oc7V9v6gooTXDEQ5PePbBQPjtZsHChRFLGaMNHYCPsEepR6v8gbJrP9OOTdzYpwe4nh2mE8_tXgFkcr4M-TtncZo5dV_iNIfE0Xw_5siPTta4XkkCIzlHR7IIIN44txwUz4leKV_veymeXmchuttmx-ms74SU4nC9nauhtCUCHnBSn5M2niiNw2luVtq_o3JUaHFPnrXnbOE_0BktnQDdlBwbRCn',
        imageAlt: 'A stylish white ceramic vase with a minimalist design.',
    },
    {
        id: 5,
        name: 'Leather Work Boots',
        price: 199.99,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDorREzzATzHsvsSDao9MG-3TaUFNGrlnGKBMvEXDR3nmaP7-Y8fH3RHs0QHUAQ6_ZFXytbSwgxT72wv-K5kx2WevM9q8C52va8Jfp44-uHOpzaTZzSc4IDRHjpuVjH0Gxed_uNonIP-2XByzoKLggq67Myg4xYjrLRB2v1vRa1_D44MUCy5I_AKSARXwPoKHy2Vpf1OW788Ox7Dqp90PvZK-u0SERYCL_yzoDGlZjF_mUWhRIBEO9YCkJCPT5Uxx8hXbesIUN3b35z',
        imageAlt: 'A pair of stylish brown leather boots.',
    },
    {
        id: 6,
        name: 'Organic Cotton T-Shirt',
        price: 25.0,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLpaBV8sggU9CA_Xh52h980DQulEchk7yFduFr8t6Qtwp1Y3SZeCLTt0jPe6swp3c5XgwOwuWH0T21yOlKAxj32EKg_Dcm_fvXsdlntDq8XXHJvnOLguTlCTA0K_fA0YAlw53Wt2LXw3k8l8xIM-Z4a3deOxNm2m9a6A7urzf-Boezyddcq8xBhxIkgUu2fUzUQW5pkW1wFULxjnFW0nHzOtyuCW5C3zELqzx5q761qMS5DtrPmQVH9Uue8HhczuvYTh-QNnqNlw3y',
        imageAlt: 'A plain white t-shirt hanging on a clothes hanger.',
    },
    {
        id: 7,
        name: 'Insulated Steel Bottle',
        price: 30.0,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOaxHRT3U6knyya-DvMDw71cVPJZV0ZqZv6cxrjaazKJYR7nQnyY6RrUjmGP4tre-_cggAGQpj9LzM4NpPtUSYbwh31pEwOjv98seamSkxSnVvmv2Q_c1hG6V70mD7tWpRLx13SDWZNNjUgjv6EE67xKPfPCZRccsLx9JaH27FFUmm9QtU-DEVjxmSACKLc3TV168wXw5-Ks4fpbvCHn0jSV0cqHCeFwER1JA0Vh3oMQEOM9a4cNVaK1xbH68Vpgt1DJgf64e162th',
        imageAlt: 'A stainless steel water bottle with a wooden cap.',
    },
    {
        id: 8,
        name: 'Smartwatch Pro',
        price: 399.0,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUaJ16xqZXsadIQlHvscSy8Y4egi2nvp-z8uoO7tYkHihFOWWTE3GAs3I5-w7iKJEBDY36M4QPwZM2lzwKrLsciDEuZ8pFN7gmCkYxce3NUHXx73pZSEUcvX74Ck05LE9jUQ6M0-ffBRONbgUnvXldzphAbCqk0kNc_30l3cfU2G9sfmKGPQ7n23uwl_a3uNSPg_ClkTqlq-9VlBj8MDDIE2iFqFdlZHyOqFsITE-L0tizk5RdnMneGGAgGrZl5CJkO5wmOgj5NJTB',
        imageAlt: 'A modern smartwatch displaying the time on its screen.',
    },
];

export default function Index() {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const handleAddToCart = (product: Product) => {
        setCartItems((prev) => [...prev, product]);
        // TODO: Add toast notification or feedback
        console.log('Added to cart:', product.name);
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <div className="flex flex-1 justify-center px-4 py-5 sm:px-8 md:px-16 lg:px-24 xl:px-40">
                    <div className="layout-content-container flex max-w-[1200px] flex-1 flex-col">
                        <ShoppingHeader cartItemCount={cartItems.length} />

                        <main className="p-4 md:p-6 lg:p-8">
                            <div className="flex flex-wrap items-baseline justify-between gap-4 p-4">
                                <h1 className="page-title">Our Products</h1>
                            </div>

                            <div className="shopping-grid">
                                {MOCK_PRODUCTS.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={handleAddToCart}
                                    />
                                ))}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}
