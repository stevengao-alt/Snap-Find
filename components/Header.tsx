
import React from 'react';
import { ShoppingCartIcon } from './IconComponents';

export const Header: React.FC = () => {
  return (
    <header className="bg-brand-green shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
        <ShoppingCartIcon className="w-10 h-10 text-white" />
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Grocery Snap & Find
        </h1>
      </div>
    </header>
  );
};
