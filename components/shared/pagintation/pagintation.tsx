"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { getPaginationItems } from "./getPaginationItems";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  className?: string;
}

const baseButtonClass = "block px-3 py-2 rounded-md text-base transition";

export function Pagination({
  totalPages,
  currentPage,
  className,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  const items = getPaginationItems({
    totalPages,
    currentPage,
    siblings: 2,
  });

  const createHref = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));

    return `${pathname}?${params.toString()}`;
  };

  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);

  return (
    <nav
      aria-label="Pagination"
      className={clsx("flex items-center justify-center gap-2 py-8", className)}
    >
      <NavLink disabled={currentPage === 1} href={createHref(prevPage)}>
        Назад
      </NavLink>

      {items.map((item, index) => {
        if (item.type === "ellipsis") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-2 text-muted-foreground"
              aria-hidden
            >
              …
            </span>
          );
        }

        return (
          <Link
            key={item.value}
            href={createHref(item.value)}
            aria-current={item.isActive ? "page" : undefined}
            className={clsx(
              baseButtonClass,
              item.isActive ? "border-2 border-blue" : "hover:bg-muted"
            )}
          >
            {item.value}
          </Link>
        );
      })}

      <NavLink
        href={createHref(nextPage)}
        disabled={currentPage === totalPages}
      >
        Вперёд
      </NavLink>
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  disabled: boolean;
  children: React.ReactNode;
}

function NavLink({ href, disabled, children }: NavLinkProps) {
  return (
    <Link
      href={href}
      aria-disabled={disabled}
      className={clsx(
        baseButtonClass,
        disabled ? "pointer-events-none opacity-50" : "hover:bg-muted"
      )}
    >
      {children}
    </Link>
  );
}
