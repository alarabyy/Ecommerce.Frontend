// Update Product interface based on API
export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  // Assuming these might come from the API in the future
  price?: number;
  category?: string;
  badge?: string | null;
  rating?: number;
  oldPrice?: number;
}
