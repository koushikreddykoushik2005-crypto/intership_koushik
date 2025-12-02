import React, { useState } from 'react';
import { useApp } from '../context';
import { X, Plus, Minus, Trash2, ShoppingBag, ChefHat } from 'lucide-react';
import { generateRecipeSuggestion } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const CartSidebar: React.FC = () => {
  const { cart, isCartOpen, setCartOpen, updateQuantity, removeFromCart, cartTotal } = useApp();
  const [recipe, setRecipe] = useState<string | null>(null);
  const [loadingRecipe, setLoadingRecipe] = useState(false);

  if (!isCartOpen) return null;

  const handleGenerateRecipe = async () => {
    setLoadingRecipe(true);
    const ingredients = cart.map(item => item.name);
    const result = await generateRecipeSuggestion(ingredients);
    setRecipe(result);
    setLoadingRecipe(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setCartOpen(false)} />
      
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
        <div className="w-screen max-w-md pointer-events-auto">
          <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                <button
                  type="button"
                  className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                  onClick={() => setCartOpen(false)}
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Close panel</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-8">
                {cart.length === 0 ? (
                  <div className="text-center py-10">
                    <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500">Your cart is empty.</p>
                  </div>
                ) : (
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {cart.map((product) => (
                        <li key={product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>{product.name}</h3>
                                <p className="ml-4">${(product.price * product.quantity).toFixed(2)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">{product.unit}</p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="flex items-center border rounded-md">
                                <button onClick={() => updateQuantity(product.id, -1)} className="p-1 hover:bg-gray-100 rounded-l-md">
                                  <Minus className="h-4 w-4 text-gray-600" />
                                </button>
                                <span className="px-2 text-gray-900 font-medium">{product.quantity}</span>
                                <button onClick={() => updateQuantity(product.id, 1)} className="p-1 hover:bg-gray-100 rounded-r-md">
                                  <Plus className="h-4 w-4 text-gray-600" />
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFromCart(product.id)}
                                className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {/* AI Chef Section */}
              {cart.length > 0 && (
                <div className="mt-8 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-emerald-800 font-semibold flex items-center gap-2">
                      <ChefHat className="h-5 w-5" />
                      Chef Gemini
                    </h3>
                  </div>
                  {!recipe ? (
                    <div className="text-center">
                      <p className="text-emerald-700 text-sm mb-3">Not sure what to cook with these?</p>
                      <button 
                        onClick={handleGenerateRecipe}
                        disabled={loadingRecipe}
                        className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                      >
                        {loadingRecipe ? "Cooking up ideas..." : "Suggest a Recipe"}
                      </button>
                    </div>
                  ) : (
                    <div className="prose prose-sm prose-emerald max-w-none text-gray-700 bg-white p-3 rounded-lg border border-emerald-100">
                      <ReactMarkdown>{recipe}</ReactMarkdown>
                      <button 
                        onClick={() => setRecipe(null)}
                        className="mt-2 text-xs text-emerald-600 hover:text-emerald-800 underline"
                      >
                        Clear Recipe
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6 bg-gray-50">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-emerald-700 transition-colors"
                >
                  Checkout
                </a>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{' '}
                  <button
                    type="button"
                    className="font-medium text-emerald-600 hover:text-emerald-500"
                    onClick={() => setCartOpen(false)}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
