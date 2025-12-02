import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            {/* Placeholder routes for now */}
            <Route path="deals" element={<div className="p-10 text-center text-gray-500">Deals Page Coming Soon</div>} />
            <Route path="about" element={<div className="p-10 text-center text-gray-500">About Page Coming Soon</div>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  );
};

export default App;
