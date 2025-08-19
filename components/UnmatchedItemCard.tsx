
import React from 'react';
import { PlusCircleIcon } from './IconComponents';
import type { IdentifiedItem } from '../types';

interface UnmatchedItemCardProps {
  item: IdentifiedItem;
  onAdd: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const UnmatchedItemCard: React.FC<UnmatchedItemCardProps> = ({ item, onAdd, onMouseEnter, onMouseLeave }) => {
  return (
    <div 
      className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 hover:border-brand-green transition-all duration-200 hover:shadow-md"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <p className="font-medium text-gray-800 capitalize">{item.name}</p>
      <button
        onClick={onAdd}
        className="flex items-center gap-1.5 text-sm text-brand-green hover:text-green-700 font-semibold transition-colors py-1 px-2 rounded-md hover:bg-green-50"
        aria-label={`Add ${item.name} to database`}
      >
        <PlusCircleIcon className="w-5 h-5" />
        Add to Database
      </button>
    </div>
  );
};
