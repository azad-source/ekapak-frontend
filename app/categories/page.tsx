import { TitleBanner } from "@/components/shared/title-banner/title-banner";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CategoryList from "./components/category-list";
import { SideMenu } from "@/components/shared/side-menu/side-menu";
import { notFound } from "next/navigation";
import { getCategories } from "@/entities/category/api";

export default async function CategoriesPage() {
  const queryClient = new QueryClient();

  const categories = await getCategories();

  if (!categories) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TitleBanner
        className="mt-12.5"
        name="Производство гибкой пластиковой упаковки "
        description="По индивидуальным размерам и&nbsp;в&nbsp;минимальные сроки"
      />
      <div className="flex gap-2.5 mt-5">
        <SideMenu className="hidden 2xl:block" />
        <CategoryList type="category" items={categories.data} />
      </div>
    </HydrationBoundary>
  );
}
