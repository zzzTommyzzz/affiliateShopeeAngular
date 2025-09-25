export interface Product {
  id: string;
  title: string;
  slug?: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  image?: string;
  images?: string[];
  rating?: number;
  category?: string;
  tags?: string[];
  affiliateUrl: string;
  description?: string;
}
