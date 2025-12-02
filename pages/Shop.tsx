import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';

export const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [sortBy, setSortBy] = useState("popularity");

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    }).sort((a, b) => {
       if (sortBy === "price-low") return a.price - b.price;
       if (sortBy === "price-high") return b.price - a.price;
       if (sortBy === "rating") return b.rating - a.rating;
       return 0; // Default popularity/mock
    });
  }, [selectedCategory, searchQuery, priceRange, sortBy]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
        
        {/* Search Mobile - often useful to have top level but also here for specific filtering */}
        <div className="relative md:hidden">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
            />
        </div>

        <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" /> Categories
            </h3>
            <div className="space-y-2">
                {CATEGORIES.map(category => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedCategory === category ? 'border-emerald-500' : 'border-gray-300'}`}>
                            {selectedCategory === category && <div className="w-2 h-2 rounded-full bg-emerald-500" />}
                        </div>
                        <span className={`text-sm ${selectedCategory === category ? 'text-emerald-700 font-medium' : 'text-gray-600 group-hover:text-gray-900'}`} onClick={() => setSelectedCategory(category)}>
                            {category}
                        </span>
                    </label>
                ))}
            </div>
        </div>

        <div>
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Price Range
            </h3>
            <div className="px-2">
                <input 
                    type="range" 
                    min="0" 
                    max="50" 
                    step="1"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>$0</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
                {selectedCategory} <span className="text-gray-400 text-lg font-normal">({filteredProducts.length})</span>
            </h1>
            
            <div className="flex items-center gap-4 w-full sm:w-auto">
                 {/* Desktop Search inside content area for focus */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search items..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64 text-sm" 
                    />
                </div>

                <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                    <option value="popularity">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                </select>
            </div>
        </div>

        {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
        ) : (
            <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <button 
                    onClick={() => {setSelectedCategory("All"); setSearchQuery(""); setPriceRange([0,50]);}}
                    className="mt-4 text-emerald-600 font-medium hover:underline"
                >
                    Clear Filters
                </button>
            </div>
        )}
      </div>
    </div>
  );
};
