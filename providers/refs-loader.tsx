"use client";

import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { CategoriesResponse } from "@/entities/category/types";
import { getCategories } from "@/entities/category/api";
import { setCategories } from "@/store/slices/category-slice";
import { Spinner } from "@/components/shared/spinner/spinner";
import { useCartPersist } from "@/hooks/use-cart-persist";

interface Refs {
  categories: CategoriesResponse | null;
}

async function fetchRefs(): Promise<Refs> {
  const [categories] = await Promise.all([getCategories()]);
  return { categories };
}

export function RefsLoader({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  useCartPersist();

  const { data, isLoading } = useQuery({
    queryKey: ["refs"],
    queryFn: fetchRefs,
    staleTime: 3600,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data?.categories) {
      dispatch(setCategories(data.categories.data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    // Показываем спиннер пока данные загружаются
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}
