import { CategoriesRoutes } from "@/routes/categories-routes";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(CategoriesRoutes.base);
}
