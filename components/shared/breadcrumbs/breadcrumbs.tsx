import Link from "next/link";

export interface BreadCrumbItem {
  caption: string;
  link: string;
}

interface BreadcrumbsProps {
  items: BreadCrumbItem[];
  className?: string;
}

const ITEM_BASE_CLASS = "rounded-2xs px-2.5 py-1";
const SEPARATOR = "/";

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (!items.length) return null;

  return (
    <nav
      aria-label="Breadcrumbs"
      className={`flex items-center gap-2.5 text-sm ${className}`}
    >
      <Link href="/" className={`${ITEM_BASE_CLASS} bg-white`}>
        Главная
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return <BreadcrumbItem key={item.link} item={item} isLast={isLast} />;
      })}
    </nav>
  );
}

interface BreadcrumbItemProps {
  item: BreadCrumbItem;
  isLast: boolean;
}

function BreadcrumbItem({ item, isLast }: BreadcrumbItemProps) {
  return (
    <>
      <span className="text-lg">{SEPARATOR}</span>

      {isLast ? (
        <span className={`${ITEM_BASE_CLASS} bg-blue text-white`}>
          {item.caption}
        </span>
      ) : (
        <Link href={item.link} className={`${ITEM_BASE_CLASS} bg-white`}>
          {item.caption}
        </Link>
      )}
    </>
  );
}
