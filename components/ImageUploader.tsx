
import React, { useCallback, useState, useRef } from 'react';
import { UploadCloudIcon } from './IconComponents';
import type { MatchedItem, IdentifiedItem } from '../types';

interface ImageUploaderProps {
  onImageUpload: (base64: string) => void;
  disabled: boolean;
  image: string | null;
  matchedItems: MatchedItem[];
  unmatchedItems: IdentifiedItem[];
  hoveredItemName: string | null;
  onHoverItem: (name: string | null) => void;
}

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
    onImageUpload, 
    disabled, 
    image,
    matchedItems,
    unmatchedItems,
    hoveredItemName,
    onHoverItem,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const base64 = await toBase64(file);
        onImageUpload(base64);
      } else {
        alert('Please upload an image file.');
      }
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleFileChange(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  }, [onImageUpload]);

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const uploaderClasses = `
    border-2 border-dashed rounded-lg p-8 w-full text-center cursor-pointer
    transition-colors duration-300 ease-in-out
    ${isDragging ? 'border-brand-green bg-brand-green-light/20' : 'border-gray-300 hover:border-brand-green'}
    ${disabled ? 'cursor-not-allowed bg-gray-200' : 'bg-white'}
  `;

  const allItems = [
    ...matchedItems.map(i => ({ name: i.name, boundingBox: i.boundingBox, status: 'matched' as const })),
    ...unmatchedItems.map(i => ({ name: i.name, boundingBox: i.boundingBox, status: 'unmatched' as const }))
  ];

  return (
    <div className="w-full">
      {image ? (
        <div className="relative w-full h-auto flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src={`data:image/jpeg;base64,${image}`} 
            alt="Uploaded grocery item" 
            className="object-contain max-h-[400px] w-full h-auto"
          />
          {allItems.map(item => {
            const { x_min, y_min, x_max, y_max } = item.boundingBox;
            const isHovered = hoveredItemName === item.name;

            const boxStyle: React.CSSProperties = {
                position: 'absolute',
                left: `${x_min * 100}%`,
                top: `${y_min * 100}%`,
                width: `${(x_max - x_min) * 100}%`,
                height: `${(y_max - y_min) * 100}%`,
                border: `3px solid ${item.status === 'matched' ? 'rgb(34 197 94)' : 'rgb(234 179 8)'}`, // green-500 or yellow-500
                boxShadow: isHovered ? '0 0 15px rgba(0,0,0,0.6)' : '0 0 10px rgba(0,0,0,0.3)',
                transition: 'all 0.2s ease-in-out',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                zIndex: isHovered ? 10 : 1,
            };
            
            const labelStyle: React.CSSProperties = {
                position: 'absolute',
                top: '0',
                left: '0',
                transform: 'translateY(-100%)',
                backgroundColor: item.status === 'matched' ? 'rgb(34 197 94)' : 'rgb(234 179 8)',
                color: 'black',
                padding: '0.125rem 0.5rem',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                borderRadius: '0.25rem',
                whiteSpace: 'nowrap',
                textTransform: 'capitalize',
                opacity: isHovered ? 1 : 0,
                visibility: isHovered ? 'visible' : 'hidden',
                transition: 'opacity 0.2s ease-in-out, visibility 0.2s ease-in-out',
            };

            return (
                <div 
                    key={item.name} 
                    style={boxStyle} 
                    onMouseEnter={() => onHoverItem(item.name)}
                    onMouseLeave={() => onHoverItem(null)}
                >
                    <span style={labelStyle}>{item.name}</span>
                </div>
            )
          })}
        </div>
      ) : (
        <div
          className={uploaderClasses}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={triggerFileSelect}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files)}
            disabled={disabled}
          />
          <UploadCloudIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            <span className="font-semibold text-brand-green">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>
      )}
    </div>
  );
};
