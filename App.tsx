
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { Spinner } from './components/Spinner';
import { ResultCard } from './components/ResultCard';
import { identifyGroceryItems } from './services/geminiService';
import { FLIPCHART_DATABASE } from './constants';
import type { GroceryItem, MatchedItem, IdentifiedItem } from './types';
import { AlertCircleIcon, CheckCircleIcon, SearchIcon } from './components/IconComponents';
import { AddItemForm } from './components/AddItemForm';
import { UnmatchedItemCard } from './components/UnmatchedItemCard';

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [matchedItems, setMatchedItems] = useState<MatchedItem[]>([]);
  const [unmatchedItems, setUnmatchedItems] = useState<IdentifiedItem[]>([]);
  const [itemToAdd, setItemToAdd] = useState<IdentifiedItem | null>(null);
  const [flipchartData, setFlipchartData] = useState<GroceryItem[]>(FLIPCHART_DATABASE);
  const [hoveredItemName, setHoveredItemName] = useState<string | null>(null);


  const handleImageUpload = useCallback(async (base64Image: string) => {
    setImage(base64Image);
    setIsLoading(true);
    setError(null);
    setMatchedItems([]);
    setUnmatchedItems([]);
    setItemToAdd(null);
    setHoveredItemName(null);

    try {
      const identifiedItems = await identifyGroceryItems(base64Image);

      const newMatched: MatchedItem[] = [];
      const newUnmatched: IdentifiedItem[] = [];

      const matchedIds = new Set<number>();
      const processedNames = new Set<string>();

      identifiedItems.forEach(item => {
        const itemNameLower = item.name.toLowerCase();
        if(processedNames.has(itemNameLower)) return;

        const match = flipchartData.find(dbItem => 
          itemNameLower.includes(dbItem.name.toLowerCase()) ||
          dbItem.name.toLowerCase().includes(itemNameLower)
        );

        if (match && !matchedIds.has(match.id)) {
          newMatched.push({ ...match, boundingBox: item.boundingBox });
          matchedIds.add(match.id);
        } else if (!match) {
          newUnmatched.push(item);
        }
        processedNames.add(itemNameLower);
      });
      
      setMatchedItems(newMatched);
      setUnmatchedItems(newUnmatched);

    } catch (err) {
      console.error(err);
      setError('Could not identify the items. Please try another image.');
    } finally {
      setIsLoading(false);
    }
  }, [flipchartData]);

  const handleReset = () => {
    setImage(null);
    setIsLoading(false);
    setError(null);
    setMatchedItems([]);
    setUnmatchedItems([]);
    setItemToAdd(null);
    setHoveredItemName(null);
  };
  
  const handleAddItem = (newItemData: Omit<GroceryItem, 'id' | 'emoji'>) => {
    if (!itemToAdd) return;

    const newId = Math.max(...flipchartData.map(item => item.id), 0) + 1;
    const newItem: GroceryItem = {
      ...newItemData,
      id: newId,
      emoji: '🛍️', // A generic shopping bag emoji for new items
    };

    const newMatchedItem: MatchedItem = {
      ...newItem,
      boundingBox: itemToAdd.boundingBox,
    };

    setFlipchartData(prevData => [...prevData, newItem]);
    setMatchedItems(prev => [...prev, newMatchedItem]);
    setUnmatchedItems(prev => prev.filter(item => item.name.toLowerCase() !== newItem.name.toLowerCase()));
    setItemToAdd(null);
  };

  const handleUpdateItemPrice = (itemId: number, newPrice: number) => {
    setFlipchartData(prevData =>
      prevData.map(item =>
        item.id === itemId ? { ...item, price: newPrice } : item
      )
    );

    setMatchedItems(prevMatched =>
        prevMatched.map(item =>
          item.id === itemId ? { ...item, price: newPrice } : item
        )
    );
  };

  const InitialState = () => (
    <div className="text-center text-brand-gray-500 flex flex-col items-center justify-center p-8 border-2 border-dashed border-brand-gray-200 rounded-lg">
        <SearchIcon className="w-16 h-16 mb-4 text-brand-gray-200" />
        <h3 className="text-xl font-semibold">Upload an image to start</h3>
        <p className="mt-2 max-w-sm">Snap a picture of grocery items, and we'll identify them and draw boxes around them.</p>
    </div>
  );

  const NoItemsFoundState = () => (
     <div className="text-center text-orange-600 bg-orange-50 p-6 rounded-lg">
        <AlertCircleIcon className="w-12 h-12 mx-auto mb-2" />
        <p className="font-semibold">No Grocery Items Identified</p>
        <p>The AI could not find any recognizable grocery items in the image. Please try a different photo.</p>
    </div>
  )
  
  const renderResult = () => {
    if (isLoading) return <Spinner />;
    if (error) {
      return (
        <div className="text-center text-red-600">
          <AlertCircleIcon className="w-12 h-12 mx-auto mb-2" />
          <p className="font-semibold">An Error Occurred</p>
          <p>{error}</p>
        </div>
      );
    }
    
    const hasResults = matchedItems.length > 0 || unmatchedItems.length > 0;

    if (!image) return <InitialState />;
    if (!hasResults && !itemToAdd) return <NoItemsFoundState />;

    return (
      <div className="w-full text-left space-y-6">
        {itemToAdd && (
          <AddItemForm 
            identifiedItem={itemToAdd}
            onAddItem={handleAddItem}
            onCancel={() => setItemToAdd(null)}
          />
        )}
        
        {!itemToAdd && (
          <>
            {matchedItems.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-green-600 mb-3">
                  <CheckCircleIcon className="w-6 h-6"/>
                  <h3 className="text-xl font-bold">Found in Database</h3>
                </div>
                <div className="space-y-4">
                  {matchedItems.map(item => 
                    <ResultCard 
                      key={item.id} 
                      item={item} 
                      onMouseEnter={() => setHoveredItemName(item.name)}
                      onMouseLeave={() => setHoveredItemName(null)}
                      onUpdatePrice={handleUpdateItemPrice}
                    />
                  )}
                </div>
              </div>
            )}
            {unmatchedItems.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-yellow-800 mb-3">
                    <SearchIcon className="w-6 h-6"/>
                    <h3 className="text-xl font-bold">New Items Identified</h3>
                </div>
                <div className="space-y-2">
                  {unmatchedItems.map(item => 
                    <UnmatchedItemCard 
                      key={item.name} 
                      item={item} 
                      onAdd={() => setItemToAdd(item)} 
                      onMouseEnter={() => setHoveredItemName(item.name)}
                      onMouseLeave={() => setHoveredItemName(null)}
                    />
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-brand-gray-100 font-sans text-brand-gray-800">
      <Header />
      <main className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-bold mb-4">Upload Grocery Image</h2>
              <ImageUploader 
                onImageUpload={handleImageUpload} 
                disabled={isLoading} 
                image={image}
                matchedItems={matchedItems}
                unmatchedItems={unmatchedItems}
                hoveredItemName={hoveredItemName}
                onHoverItem={setHoveredItemName}
              />
              {image && (
                 <button 
                  onClick={handleReset}
                  className="mt-4 w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
                >
                  Start Over
                </button>
              )}
            </div>

            <div className="mt-8 md:mt-0">
              <h2 className="text-2xl font-bold mb-4">Identification Results</h2>
              <div className="min-h-[350px] p-4 bg-brand-gray-100 rounded-lg flex items-start justify-center overflow-y-auto">
                 {renderResult()}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-4 text-brand-gray-500 text-sm">
        <p>Grocery Snap & Find © 2024</p>
      </footer>
    </div>
  );
};

export default App;
