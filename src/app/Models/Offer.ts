// Define interfaces that match the API response accurately

export interface OfferProduct {
    id: number;
    name: string;
    description: string;
    imageUrl?: string;
}

export interface OfferItem {
    id: number;
    price: number;
    available: number;
    sold: number;
    product: OfferProduct;
}

export interface OfferSeller {
    id: number;
    name: string;
}

// --- *** هذا هو الجزء المهم الذي كان يسبب الخطأ *** ---
// Ensure this interface is EXPORTED and matches the API structure
export interface Offer {
    id: number;
    title: string;
    description: string;
    price: number;
    createdAt: string;
    seller: OfferSeller;
    items: OfferItem[];
    images: string[];
}
// --------------------------------------------------------

// For the paginated response from GET /api/offers
export interface PaginatedOffers {
    items: Offer[];
    totalCount: number;
}

// For creating a new offer
export interface OfferCreatePayload {
  title: string;
  description: string;
  items: { productId: number; price: number; available: number }[];
}

// For the response after creating an offer
export interface CreateOfferResponse {
  success: boolean;
  message: string | null;
  data: number; // The ID of the newly created offer
}

// For adding a single item to an offer
export interface OfferItemPayload {
  offerId: number;
  productId: number;
  price: number;
}
