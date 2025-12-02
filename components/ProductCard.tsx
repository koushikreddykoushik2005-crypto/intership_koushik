import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context';
import { Plus, Heart, Info, X } from 'lucide-react';
import { getProductInsights } from '../services/geminiService';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const isWishlisted = wishlist.includes(product.id);
  const [showQuickView, setShowQuickView] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  const handleQuickView = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowQuickView(true);
    if (!aiInsight) {
      const insight = await getProductInsights(product);
      setAiInsight(insight);
    }
  };

  return (
    <>
      <div className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
        {/* Discount Badge */}
        {Math.random() > 0.7 && (
           <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
             SALE
           </div>
        )}
        
        {/* Wishlist Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
          className={`absolute top-2 right-2 p-2 rounded-full z-10 transition-colors ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white/80 hover:bg-white text-gray-400 hover:text-red-500'}`}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-100 lg:aspect-none group-hover:opacity-90 relative h-48 cursor-pointer" onClick={handleQuickView}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
           <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-600">
            {product.rating} ★ ({product.reviews})
          </div>
        </div>
        
        <div className="mt-4 flex flex-col flex-1 px-4 pb-4">
          <div className="flex-1">
             <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide">{product.category}</p>
            <h3 className="text-sm font-bold text-gray-900 mt-1 line-clamp-1">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div>
               <p className="text-lg font-bold text-gray-900">${product.price}</p>
               <p className="text-xs text-gray-500">per {product.unit}</p>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 z-[60] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowQuickView(false)}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-bold leading-6 text-gray-900" id="modal-title">
                        {product.name}
                        </h3>
                        <button onClick={() => setShowQuickView(false)} className="text-gray-400 hover:text-gray-500">
                        <X className="h-6 w-6" />
                        </button>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
                        
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-gray-700">Description</h4>
                                <p className="text-sm text-gray-600">{product.description}</p>
                            </div>

                            {aiInsight ? (
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                    <h5 className="flex items-center text-xs font-bold text-blue-700 uppercase mb-1">
                                        <Info className="h-3 w-3 mr-1" /> AI Insight
                                    </h5>
                                    <p className="text-sm text-blue-800 italic">"{aiInsight}"</p>
                                </div>
                            ) : (
                                <div className="h-16 bg-gray-100 animate-pulse rounded"></div>
                            )}

                            <div>
                                <h4 className="font-semibold text-gray-700">Nutrition (per serving)</h4>
                                <div className="grid grid-cols-4 gap-2 text-center text-xs mt-2">
                                    <div className="bg-gray-50 p-2 rounded">
                                        <span className="block font-bold">{product.nutrition.calories}</span>
                                        <span className="text-gray-500">Cals</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded">
                                        <span className="block font-bold">{product.nutrition.protein}</span>
                                        <span className="text-gray-500">Prot</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded">
                                        <span className="block font-bold">{product.nutrition.carbs}</span>
                                        <span className="text-gray-500">Carbs</span>
                                    </div>
                                    <div className="bg-gray-50 p-2 rounded">
                                        <span className="block font-bold">{product.nutrition.fat}</span>
                                        <span className="text-gray-500">Fat</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="pt-4 flex items-center justify-between">
                                <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                                <button
                                    onClick={() => { addToCart(product); setShowQuickView(false); }}
                                    className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-3 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 sm:w-auto sm:text-sm"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
