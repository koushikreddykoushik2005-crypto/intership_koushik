export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  tags: string[];
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  wishlist: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
