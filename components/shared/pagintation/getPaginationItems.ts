export type PaginationItem =
  | { type: "page"; value: number; isActive: boolean }
  | { type: "ellipsis" };

interface GetPaginationItemsParams {
  totalPages: number;
  currentPage: number;
  siblings?: number;
}

export function getPaginationItems({
  totalPages,
  currentPage,
  siblings = 1,
}: GetPaginationItemsParams): PaginationItem[] {
  if (totalPages <= 1) {
    return [];
  }

  const items: PaginationItem[] = [];

  const startPage = Math.max(2, currentPage - siblings);
  const endPage = Math.min(totalPages - 1, currentPage + siblings);

  const showLeftEllipsis = startPage > 2;
  const showRightEllipsis = endPage < totalPages - 1;

  items.push({
    type: "page",
    value: 1,
    isActive: currentPage === 1,
  });

  if (showLeftEllipsis) {
    items.push({ type: "ellipsis" });
  }

  for (let page = startPage; page <= endPage; page++) {
    items.push({
      type: "page",
      value: page,
      isActive: page === currentPage,
    });
  }

  if (showRightEllipsis) {
    items.push({ type: "ellipsis" });
  }

  if (totalPages > 1) {
    items.push({
      type: "page",
      value: totalPages,
      isActive: currentPage === totalPages,
    });
  }

  return items;
}
