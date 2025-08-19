
import React, { useState } from 'react';
import { CATEGORIES } from '../constants';
import type { GroceryItem, IdentifiedItem } from '../types';
import { PlusCircleIcon } from './IconComponents';

interface AddItemFormProps {
  identifiedItem: IdentifiedItem;
  onAddItem: (item: Omit<GroceryItem, 'id' | 'emoji'>) => void;
  onCancel: () => void;
}

export const AddItemForm: React.FC<AddItemFormProps> = ({ identifiedItem, onAddItem, onCancel }) => {
  const [itemName, setItemName] = useState(identifiedItem.name);
  const [category, setCategory] = useState<GroceryItem['category'] | ''>('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName || !category || !price) {
      setError('All fields are required.');
      return;
    }
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      setError('Please enter a valid price.');
      return;
    }
    setError('');
    onAddItem({
      name: itemName,
      category: category as GroceryItem['category'],
      price: priceValue,
    });
  };

  return (
    <div className="text-center bg-yellow-50 p-6 rounded-lg border border-yellow-200 animate-fade-in">
      <PlusCircleIcon className="w-12 h-12 mx-auto mb-2 text-yellow-500" />
      <p className="font-semibold text-yellow-800">Add New Item</p>
      <p className="text-sm text-yellow-700 mb-4">Add details for "{itemName}" to the database.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name</label>
          <input
            type="text"
            id="itemName"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm capitalize"
          />
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as GroceryItem['category'])}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm rounded-md"
          >
            <option value="" disabled>Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (per unit)</label>
          <div className="mt-1 relative rounded-md shadow-sm">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
              min="0"
              className="pl-7 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-brand-green focus:border-brand-green sm:text-sm"
              placeholder="0.00"
            />
          </div>
        </div>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        <div className="flex gap-2 pt-2">
            <button
                type="button"
                onClick={onCancel}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
            >
                Cancel
            </button>
            <button 
              type="submit"
              className="w-full bg-brand-green hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center gap-2"
            >
              <PlusCircleIcon className="w-5 h-5" />
              Add Item
            </button>
        </div>
      </form>
    </div>
  );
};
