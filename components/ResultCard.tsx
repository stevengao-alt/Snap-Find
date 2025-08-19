
import React, { useState } from 'react';
import type { MatchedItem } from '../types';
import { PencilIcon, CheckIcon, XIcon } from './IconComponents';

interface ResultCardProps {
  item: MatchedItem;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onUpdatePrice: (id: number, newPrice: number) => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ item, onMouseEnter, onMouseLeave, onUpdatePrice }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(item.price.toString());
  const [error, setError] = useState('');

  const handleSave = () => {
    const priceValue = parseFloat(newPrice);
    if (isNaN(priceValue) || priceValue < 0) {
      setError('Invalid price');
      return;
    }
    onUpdatePrice(item.id, priceValue);
    setIsEditing(false);
    setError('');
  };

  const handleCancel = () => {
    setNewPrice(item.price.toString());
    setIsEditing(false);
    setError('');
  };

  return (
    <div 
      className="bg-white border border-brand-green-light rounded-lg shadow-md p-6 animate-fade-in transition-all duration-200 hover:scale-105 hover:shadow-xl hover:border-brand-green"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-start gap-4">
        <div className="text-5xl">{item.emoji}</div>
        <div className="flex-grow text-left">
          <h3 className="text-2xl font-bold text-gray-800 capitalize">{item.name}</h3>
          <p className="text-sm bg-brand-green-light text-green-800 font-medium inline-block px-2 py-0.5 rounded-full mt-1">
            {item.category}
          </p>
          <div className="mt-3">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">$</span>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSave() }}
                    step="0.01"
                    min="0"
                    className="pl-7 w-28 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-brand-green focus:border-brand-green"
                    aria-label={`New price for ${item.name}`}
                    autoFocus
                  />
                </div>
                <button onClick={handleSave} className="p-1.5 text-green-600 hover:bg-green-100 rounded-full" aria-label="Save price">
                  <CheckIcon className="w-5 h-5" />
                </button>
                <button onClick={handleCancel} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-full" aria-label="Cancel edit">
                  <XIcon className="w-5 h-5" />
                </button>
                {error && <p className="text-xs text-red-500">{error}</p>}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <p className="text-3xl font-light text-gray-700">
                  ${item.price.toFixed(2)}
                </p>
                <button 
                    onClick={() => setIsEditing(true)} 
                    className="p-1.5 text-gray-500 hover:text-brand-green hover:bg-gray-100 rounded-full transition-colors"
                    aria-label={`Edit price for ${item.name}`}
                >
                  <PencilIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
