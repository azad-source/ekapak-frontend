"use client";

interface IProps {
  icon: React.ReactNode;
  label: string;
  badge?: number;
  onClick: () => void;
}

export function ActionButton({ icon, label, badge, onClick }: IProps) {
  const showBadge = typeof badge === "number" && badge > 0;

  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center gap-1.5"
    >
      {icon}
      <span className="text-sm">{label}</span>

      {showBadge && (
        <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] text-blue-600 border">
          {badge}
        </span>
      )}
    </button>
  );
}
