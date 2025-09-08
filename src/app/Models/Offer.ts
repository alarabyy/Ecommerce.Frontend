
export interface OfferItem {
  productId: number;
  price: number;
}

export interface Offer {
  title: string;
  description: string;
  items: OfferItem[];
}

export interface OfferItemPayload {
  offerId: number;
  productId: number;
  price: number;
}
