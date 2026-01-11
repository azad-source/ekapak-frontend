export interface CategoriesResponse {
  data: Category[];
  total: number;
}

export interface CategoryResponse {
  data: Category;
}

export type CategoryDescription = {
  type: "text_section";
  data: { content: string; heading: string };
} & {
  type: "simple_text";
  data: { text_content: string };
} & {
  type: "notification_block";
  data: { type: string; message: string };
} & {
  type: "features_list";
  data: { items: { text: string }[]; heading: string };
};

interface CategoryProduct {
  uuid: string;
  name: string;
  slug: string;
  description: string;
  article: string;
  category_uuid: string;
}

export interface Category {
  uuid: string;
  name: string;
  slug: string;
  description?: string | null;
  children?: Category[] | null;
  seo_title?: string | null;
  seo_description?: string | null;
  image_url?: string | null;
  min_price?: string | null;
  products?: CategoryProduct[] | null;
  parents?: Category[] | null;
}
