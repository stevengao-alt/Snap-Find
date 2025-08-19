
export interface BoundingBox {
  x_min: number;
  y_min: number;
  x_max: number;
  y_max: number;
}

export interface IdentifiedItem {
  name: string;
  boundingBox: BoundingBox;
}

export interface MatchedItem extends GroceryItem {
  boundingBox: BoundingBox;
}

export interface GroceryItem {
  id: number;
  name: string;
  category: 'Fruit' | 'Vegetable' | 'Dairy' | 'Bakery' | 'Meat' | 'Pantry' | 'Beverages' | 'Frozen' | 'Snacks';
  price: number;
  emoji: string;
}
