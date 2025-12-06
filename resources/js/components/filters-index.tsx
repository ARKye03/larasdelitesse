import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useMemo, useState } from 'react';

interface Product {
    id: number;
    name: string;
    description: string;
    category: string;
    brand: string;
    price: number;
    imageFile: string;
    created_at: string;
    updated_at: string;
    stock: number;
    rating: number;
}

interface FiltersIndexProps {
    productsList: Product[];
    onFilterChange: (filteredProducts: Product[]) => void;
}

export const FiltersIndex = ({
    productsList,
    onFilterChange,
}: FiltersIndexProps) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [categorySearch, setCategorySearch] = useState('');
    const [brandSearch, setBrandSearch] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const uniqueCategories = useMemo(() => {
        return Array.from(new Set(productsList.map((p) => p.category))).sort();
    }, [productsList]);

    const uniqueBrands = useMemo(() => {
        return Array.from(new Set(productsList.map((p) => p.brand))).sort();
    }, [productsList]);

    const filteredCategories = useMemo(() => {
        const filtered = uniqueCategories.filter((cat) =>
            cat.toLowerCase().includes(categorySearch.toLowerCase()),
        );
        return filtered.slice(0, 10);
    }, [uniqueCategories, categorySearch]);

    const filteredBrands = useMemo(() => {
        const filtered = uniqueBrands.filter((brand) =>
            brand.toLowerCase().includes(brandSearch.toLowerCase()),
        );
        return filtered.slice(0, 10);
    }, [uniqueBrands, brandSearch]);

    const filteredProducts = useMemo(() => {
        return productsList.filter((product) => {
            const categoryMatch =
                selectedCategories.length === 0 ||
                selectedCategories.includes(product.category);
            const brandMatch =
                selectedBrands.length === 0 ||
                selectedBrands.includes(product.brand);
            return categoryMatch && brandMatch;
        });
    }, [productsList, selectedCategories, selectedBrands]);

    // Notify parent component whenever filtered products change
    useMemo(() => {
        onFilterChange(filteredProducts);
    }, [filteredProducts, onFilterChange]);

    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category],
        );
    };

    const toggleBrand = (brand: string) => {
        setSelectedBrands((prev) =>
            prev.includes(brand)
                ? prev.filter((b) => b !== brand)
                : [...prev, brand],
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setCategorySearch('');
        setBrandSearch('');
    };

    const hasActiveFilters =
        selectedCategories.length > 0 || selectedBrands.length > 0;

    return (
        <div className="rounded-lg bg-gray-800/50">
            {/* Header - Always Visible */}
            <div className="flex items-center justify-between p-4">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 text-lg font-semibold text-white transition-colors hover:text-gray-300"
                >
                    <span>Filters</span>
                    {hasActiveFilters && (
                        <span className="rounded-full bg-ctp-red-700 px-2 py-0.5 text-xs">
                            {selectedCategories.length + selectedBrands.length}
                        </span>
                    )}
                    {isExpanded ? (
                        <ChevronUp className="h-5 w-5" />
                    ) : (
                        <ChevronDown className="h-5 w-5" />
                    )}
                </button>
                {hasActiveFilters && (
                    <Button
                        onClick={clearFilters}
                        className="text-sm text-gray-400 hover:text-white"
                        variant="ghost"
                        size="sm"
                    >
                        Clear All
                    </Button>
                )}
            </div>

            {/* Collapsible Content */}
            {isExpanded && (
                <div className="space-y-4 border-t border-gray-700 p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        {/* Category Filter */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">
                                Category
                                {selectedCategories.length > 0 && (
                                    <span className="ml-2 text-xs text-gray-400">
                                        ({selectedCategories.length} selected)
                                    </span>
                                )}
                            </label>
                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={categorySearch}
                                onChange={(e) =>
                                    setCategorySearch(e.target.value)
                                }
                                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-ctp-red-700 focus:ring-1 focus:ring-ctp-red-700 focus:outline-none"
                            />
                            <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto">
                                {filteredCategories.length > 0 ? (
                                    filteredCategories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() =>
                                                toggleCategory(category)
                                            }
                                            className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm transition-all duration-200 ${
                                                selectedCategories.includes(
                                                    category,
                                                )
                                                    ? 'bg-ctp-red-700 text-white'
                                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            }`}
                                        >
                                            {category}
                                            {selectedCategories.includes(
                                                category,
                                            ) && <X className="h-3 w-3" />}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        No categories found
                                    </p>
                                )}
                            </div>
                            {filteredCategories.length === 10 && (
                                <p className="text-xs text-gray-400">
                                    Showing first 10 results. Use search to find
                                    more.
                                </p>
                            )}
                        </div>

                        {/* Brand Filter */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">
                                Brand
                                {selectedBrands.length > 0 && (
                                    <span className="ml-2 text-xs text-gray-400">
                                        ({selectedBrands.length} selected)
                                    </span>
                                )}
                            </label>
                            <input
                                type="text"
                                placeholder="Search brands..."
                                value={brandSearch}
                                onChange={(e) => setBrandSearch(e.target.value)}
                                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-ctp-sapphire-700 focus:ring-1 focus:ring-ctp-sapphire-700 focus:outline-none"
                            />
                            <div className="flex max-h-32 flex-wrap gap-2 overflow-y-auto">
                                {filteredBrands.length > 0 ? (
                                    filteredBrands.map((brand) => (
                                        <button
                                            key={brand}
                                            onClick={() => toggleBrand(brand)}
                                            className={`flex items-center gap-1 rounded-full px-3 py-1 text-sm transition-all duration-200 ${
                                                selectedBrands.includes(brand)
                                                    ? 'bg-ctp-sapphire-700 text-white'
                                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            }`}
                                        >
                                            {brand}
                                            {selectedBrands.includes(brand) && (
                                                <X className="h-3 w-3" />
                                            )}
                                        </button>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-400">
                                        No brands found
                                    </p>
                                )}
                            </div>
                            {filteredBrands.length === 10 && (
                                <p className="text-xs text-gray-400">
                                    Showing first 10 results. Use search to find
                                    more.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Active Filters Summary */}
                    {hasActiveFilters && (
                        <div className="pt-2 text-sm text-gray-400">
                            Showing {filteredProducts.length} of{' '}
                            {productsList.length} products
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
