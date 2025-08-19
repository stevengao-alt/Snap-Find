
import type { GroceryItem } from './types';

export const FLIPCHART_DATABASE: GroceryItem[] = [
  // Fruits
  { id: 1, name: 'Apple', category: 'Fruit', price: 0.50, emoji: '🍎' },
  { id: 2, name: 'Banana', category: 'Fruit', price: 0.30, emoji: '🍌' },
  { id: 13, name: 'Orange', category: 'Fruit', price: 0.60, emoji: '🍊' },
  { id: 14, name: 'Grapes', category: 'Fruit', price: 4.50, emoji: '🍇' },
  { id: 15, name: 'Strawberries', category: 'Fruit', price: 3.99, emoji: '🍓' },
  { id: 16, name: 'Blueberries', category: 'Fruit', price: 4.99, emoji: '🫐' },
  { id: 17, name: 'Watermelon', category: 'Fruit', price: 5.99, emoji: '🍉' },
  { id: 18, name: 'Pineapple', category: 'Fruit', price: 2.79, emoji: '🍍' },
  { id: 19, name: 'Avocado', category: 'Fruit', price: 1.80, emoji: '🥑' },
  { id: 20, name: 'Lemon', category: 'Fruit', price: 0.70, emoji: '🍋' },

  // Vegetables
  { id: 8, name: 'Carrot', category: 'Vegetable', price: 1.50, emoji: '🥕' },
  { id: 9, name: 'Broccoli', category: 'Vegetable', price: 2.00, emoji: '🥦' },
  { id: 10, name: 'Tomato', category: 'Vegetable', price: 2.75, emoji: '🍅' },
  { id: 21, name: 'Onion', category: 'Vegetable', price: 1.20, emoji: '🧅' },
  { id: 22, name: 'Garlic', category: 'Vegetable', price: 0.80, emoji: '🧄' },
  { id: 23, name: 'Potato', category: 'Vegetable', price: 0.90, emoji: '🥔' },
  { id: 24, name: 'Lettuce', category: 'Vegetable', price: 1.99, emoji: '🥬' },
  { id: 25, name: 'Bell Pepper', category: 'Vegetable', price: 1.50, emoji: '🫑' },
  { id: 26, name: 'Cucumber', category: 'Vegetable', price: 0.99, emoji: '🥒' },
  { id: 27, name: 'Spinach', category: 'Vegetable', price: 3.20, emoji: '🍃' },
  { id: 28, name: 'Mushroom', category: 'Vegetable', price: 2.50, emoji: '🍄' },

  // Dairy
  { id: 3, name: 'Milk', category: 'Dairy', price: 3.50, emoji: '🥛' },
  { id: 5, name: 'Eggs', category: 'Dairy', price: 4.00, emoji: '🥚' },
  { id: 6, name: 'Cheese', category: 'Dairy', price: 5.50, emoji: '🧀' },
  { id: 29, name: 'Yogurt', category: 'Dairy', price: 1.25, emoji: '🍦' },
  { id: 30, name: 'Butter', category: 'Dairy', price: 4.80, emoji: '🧈' },
  { id: 31, name: 'Sour Cream', category: 'Dairy', price: 2.30, emoji: '🥣' },
  { id: 32, name: 'Cream Cheese', category: 'Dairy', price: 3.10, emoji: '🥯' },

  // Bakery
  { id: 4, name: 'Bread', category: 'Bakery', price: 2.25, emoji: '🍞' },
  { id: 33, name: 'Bagels', category: 'Bakery', price: 3.50, emoji: '🥯' },
  { id: 34, name: 'Croissant', category: 'Bakery', price: 1.50, emoji: '🥐' },
  { id: 35, name: 'Muffin', category: 'Bakery', price: 2.00, emoji: '🧁' },
  { id: 36, name: 'Cake', category: 'Bakery', price: 15.00, emoji: '🎂' },

  // Meat
  { id: 7, name: 'Chicken Breast', category: 'Meat', price: 8.99, emoji: '🍗' },
  { id: 37, name: 'Ground Beef', category: 'Meat', price: 6.50, emoji: '🥩' },
  { id: 38, name: 'Bacon', category: 'Meat', price: 7.20, emoji: '🥓' },
  { id: 39, name: 'Sausage', category: 'Meat', price: 5.80, emoji: '🌭' },
  { id: 40, name: 'Salmon', category: 'Meat', price: 12.50, emoji: '🐟' },
  { id: 41, name: 'Shrimp', category: 'Meat', price: 10.00, emoji: '🦐' },

  // Pantry
  { id: 11, name: 'Pasta', category: 'Pantry', price: 1.80, emoji: '🍝' },
  { id: 12, name: 'Rice', category: 'Pantry', price: 6.20, emoji: '🍚' },
  { id: 42, name: 'Cereal', category: 'Pantry', price: 4.50, emoji: '🥣' },
  { id: 43, name: 'Oats', category: 'Pantry', price: 3.80, emoji: '🥣' },
  { id: 44, name: 'Flour', category: 'Pantry', price: 3.00, emoji: '🌾' },
  { id: 45, name: 'Sugar', category: 'Pantry', price: 2.80, emoji: '🍬' },
  { id: 46, name: 'Olive Oil', category: 'Pantry', price: 9.50, emoji: '🫒' },
  { id: 47, name: 'Canned Tuna', category: 'Pantry', price: 1.50, emoji: '🥫' },
  { id: 48, name: 'Peanut Butter', category: 'Pantry', price: 4.20, emoji: '🥜' },
  { id: 49, name: 'Jam', category: 'Pantry', price: 3.50, emoji: '🍓' },
  { id: 50, name: 'Coffee', category: 'Pantry', price: 8.99, emoji: '☕' },
  { id: 51, name: 'Tea', category: 'Pantry', price: 3.99, emoji: '🍵' },
  
  // Beverages
  { id: 52, name: 'Orange Juice', category: 'Beverages', price: 3.80, emoji: '🍊' },
  { id: 53, name: 'Apple Juice', category: 'Beverages', price: 3.20, emoji: '🍎' },
  { id: 54, name: 'Soda', category: 'Beverages', price: 1.99, emoji: '🥤' },
  { id: 55, name: 'Water Bottle', category: 'Beverages', price: 1.00, emoji: '💧' },

  // Frozen
  { id: 56, name: 'Frozen Pizza', category: 'Frozen', price: 6.99, emoji: '🍕' },
  { id: 57, name: 'Ice Cream', category: 'Frozen', price: 5.50, emoji: '🍨' },
  { id: 58, name: 'Frozen Vegetables', category: 'Frozen', price: 2.50, emoji: '🥦' },
  { id: 59, name: 'Frozen Fries', category: 'Frozen', price: 3.50, emoji: '🍟' },
  
  // Snacks
  { id: 60, name: 'Chips', category: 'Snacks', price: 3.75, emoji: '🥔' },
  { id: 61, name: 'Cookies', category: 'Snacks', price: 4.00, emoji: '🍪' },
  { id: 62, name: 'Crackers', category: 'Snacks', price: 3.25, emoji: '🥨' },
  { id: 63, name: 'Chocolate Bar', category: 'Snacks', price: 1.79, emoji: '🍫' },
];

export const CATEGORIES: GroceryItem['category'][] = [
  'Fruit', 
  'Vegetable', 
  'Dairy', 
  'Bakery', 
  'Meat', 
  'Pantry', 
  'Beverages', 
  'Frozen', 
  'Snacks'
];