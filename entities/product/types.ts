import { PaginMeta } from "../pagin/types";

// ====== Offer ======
export interface Offer {
  uuid: string;
  price: string;
  currency: string;
  unit: string;
  quantity: number;
}

// ====== Product ======
export interface Product {
  uuid: string;
  name: string;
  slug: string;
  description: string;
  article: string;
  category_uuid: string;

  // Ценовые и валютные данные
  offers?: Offer[];
  offers_min_price?: string;

  // SEO
  seo_description?: string;

  // Изображения
  images?: ImageParams[];

  // Единица измерения
  unit_name: string;
  unit_code: string;
  unit_iso: string;

  // Налоги
  vat_rate: number;
  vat_type: string;

  // Флаги
  is_new: 0 | 1;
  is_set: 0 | 1;
  fixed_price: 0 | 1;

  // Идентификаторы
  external_id: string;

  // Динамические свойства товара (ключ — строка, значение — строка или пусто)
  properties: Record<string, string>;

  // Поле category в ответе — null, но может быть объектом в будущем
  category: null | unknown; // или конкретный тип, если появится
}

// ====== Image ======
export interface ImageParams {
  original_url: string;
  card_url: string;
}

// ====== API Responses ======
export interface PagedProductsResponse {
  data: Product[];
  meta: PaginMeta;
}

export interface PagedProductsRequest {
  page: number;
  per_page: number;
  category?: string;
}

export interface ProductResponse {
  data: Product;
}
