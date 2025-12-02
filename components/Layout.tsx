import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../context';
import { ShoppingCart, Menu, X, Search, Heart, User, Sparkles } from 'lucide-react';
import { CartSidebar } from './CartSidebar';
import { AIAssistant } from './AIAssistant';

export const Layout: React.FC = () => {
  const { cartCount, setCartOpen } = useApp();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Deals', path: '/deals' },
    { name: 'About', path: '/about' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white sticky top-0 z-30 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            
            {/* Logo & Desktop Nav */}
            <div className="flex items-center">
              <NavLink to="/" className="flex-shrink-0 flex items-center gap-2">
                 <div className="bg-emerald-600 p-1.5 rounded-lg">
                    <Sparkles className="h-6 w-6 text-white" />
                 </div>
                 <span className="font-bold text-xl tracking-tight text-emerald-900">FreshGen</span>
              </NavLink>
              <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-full ${
                        isActive || (link.path === '/shop' && location.pathname.startsWith('/shop'))
                          ? 'border-emerald-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative hidden md:block">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                 </div>
                 <input type="text" placeholder="Search products..." className="pl-10 pr-4 py-1.5 border border-gray-200 rounded-full text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 w-64 transition-all" />
              </div>

              <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                <Heart className="h-6 w-6" />
              </button>
              
              <button 
                className="p-2 text-gray-400 hover:text-emerald-600 relative group"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              <button className="p-2 text-gray-400 hover:text-gray-500 hidden sm:block">
                <User className="h-6 w-6" />
              </button>

              <div className="-mr-2 flex items-center sm:hidden">
                <button
                  onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200">
            <div className="pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                      isActive
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Shop</h3>
                  <ul className="mt-4 space-y-4">
                      <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Fruits & Veg</a></li>
                      <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Dairy</a></li>
                      <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Meat</a></li>
                  </ul>
              </div>
              <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                  <ul className="mt-4 space-y-4">
                      <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">About</a></li>
                      <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Careers</a></li>
                      <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Privacy</a></li>
                  </ul>
              </div>
              <div>
                 <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
                 <ul className="mt-4 space-y-4">
                      <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Contact Us</a></li>
                      <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">FAQ</a></li>
                      <li><a href="#" className="text-base text-gray-500 hover:text-gray-900">Returns</a></li>
                  </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                 <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">FreshGen</h3>
                 <p className="mt-4 text-base text-gray-500">
                    Experience the future of grocery shopping with AI-powered suggestions.
                 </p>
              </div>
           </div>
           <div className="mt-8 border-t border-gray-200 pt-8 text-center text-gray-400 text-sm">
             &copy; 2024 FreshGen Grocery. All rights reserved.
           </div>
        </div>
      </footer>

      {/* Overlays */}
      <CartSidebar />
      <AIAssistant />
    </div>
  );
};
