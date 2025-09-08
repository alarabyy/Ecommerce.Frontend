export interface OfferProduct {
    id: number;
    name: string;
    description: string;
    imageUrl?: string; // Add imageUrl to product
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

export interface Offer {
    id: number;
    title: string;
    description: string;
    price: number;
    createdAt: string;
    seller: OfferSeller;
    items: OfferItem[];
    images: string[]; // This will now hold the real image names
}

export interface PaginatedOffers {
    items: Offer[];
    totalCount: number;
}

export interface OfferItemPayload {
    offerId: number;
    productId: number;
    price: number;
}

// For creating a new offer
export interface OfferCreatePayload {
    title: string;
    description: string;
    items: { productId: number; price: number }[];
}

// For the response after creating an offer
export interface CreateOfferResponse {
    success: boolean;
    message: string | null;
    data: {
        id: number;
        // ... other properties if any
    };
}
