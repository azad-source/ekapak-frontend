export interface Offer {
  uuid: string;
  name: string;
  price_value: number;
  price_currency: string;
  price_display_text?: string;
  quantity: number;
  base_unit_name_full: string;
}

export interface Product {
  uuid: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  offers: Offer[];
}
