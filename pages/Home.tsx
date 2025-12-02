import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Clock } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const featuredProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden bg-emerald-900 h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
             alt="Grocery Background" 
             className="w-full h-full object-cover opacity-40"
           />
        </div>
        <div className="relative z-10 px-6 sm:px-12 lg:px-16 max-w-2xl text-white">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/30 border border-emerald-400/50 backdrop-blur-md text-emerald-100 text-sm font-medium mb-4">
             AI-Powered Shopping
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            Fresh Groceries,<br/>
            <span className="text-emerald-400">Smartly Delivered.</span>
          </h1>
          <p className="text-lg sm:text-xl text-emerald-100 mb-8 max-w-lg">
            Get personalized recipes, nutritional insights, and the freshest produce delivered to your doorstep in minutes.
          </p>
          <div className="flex gap-4">
            <NavLink to="/shop" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3.5 rounded-full font-bold transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2">
              Shop Now <ArrowRight className="h-5 w-5" />
            </NavLink>
             <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-8 py-3.5 rounded-full font-bold transition-all">
              View Deals
            </button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="bg-blue-50 p-4 rounded-full mb-4">
               <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">30 Min Delivery</h3>
            <p className="text-gray-500 text-sm">Lightning fast delivery for your urgent needs.</p>
         </div>
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="bg-green-50 p-4 rounded-full mb-4">
               <ShieldCheck className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Quality Guarantee</h3>
            <p className="text-gray-500 text-sm">100% fresh or your money back. No questions asked.</p>
         </div>
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
            <div className="bg-purple-50 p-4 rounded-full mb-4">
               <Truck className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Free Shipping</h3>
            <p className="text-gray-500 text-sm">On all orders over $50. Join FreshGen+ for more.</p>
         </div>
      </div>

      {/* Featured Products */}
      <div>
        <div className="flex justify-between items-end mb-6">
           <div>
              <h2 className="text-2xl font-bold text-gray-900">Fresh Recommendations</h2>
              <p className="text-gray-500 text-sm mt-1">Curated picks for you</p>
           </div>
           <NavLink to="/shop" className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
           </NavLink>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Banner */}
      <div className="bg-orange-50 rounded-2xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-orange-100">
         <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Get 20% off your first order</h2>
            <p className="text-gray-600 mb-6">Use code <span className="font-mono font-bold bg-orange-200 px-2 py-1 rounded text-orange-800">FRESH20</span> at checkout.</p>
            <div className="flex flex-col sm:flex-row gap-3">
               <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-orange-500" />
               <button className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800">Subscribe</button>
            </div>
         </div>
         <img src="https://cdn-icons-png.flaticon.com/512/3081/3081986.png" alt="Discount Basket" className="w-48 h-48 object-contain opacity-90" />
      </div>
    </div>
  );
};
