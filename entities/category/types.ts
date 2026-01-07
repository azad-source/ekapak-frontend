export interface Category {
  uuid: string;
  name: string;
  slug: string;
  description: string | null;
  parents: Category[];
  children: Category[];
}
