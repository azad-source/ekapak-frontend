import React from "react";

interface BurgerMenuButtonProps {
  isOpen?: boolean;
  className?: string;
  onClick: () => void;
}

const BurgerMenuButton: React.FC<BurgerMenuButtonProps> = ({
  isOpen,
  className = "",
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
      className={`flex flex-col justify-center items-center ${className}`}
    >
      <span className="w-4 h-0.5 bg-black block mb-1" />
      <span className="w-4 h-0.5 bg-black block mb-1" />
      <span className="w-4 h-0.5 bg-black block" />
    </button>
  );
};

export default BurgerMenuButton;
