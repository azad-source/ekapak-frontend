import React from "react";
import { LoupeIcon } from "../icons/loupe-icon";

type SizeProp = "small" | "medium" | "large";

const sizeConfig: Record<SizeProp, string> = {
  small: "h-10 text-sm",
  medium: "h-13 text-base",
  large: "h-15 text-lg",
};

interface SearchInputProps {
  value: string;
  placeholder?: string;
  size?: SizeProp;
  className?: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  placeholder = "Поиск",
  size = "medium",
  className = "",
  onChange,
}) => {
  const inputClass = `
    ${sizeConfig[size]}
    w-full
    pl-12
    pr-5
    box-border
    border border-gray-300
    rounded-sm
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    focus:border-transparent
  `;

  return (
    <div className={`relative flex items-center box-border ${className}`}>
      <LoupeIcon className="absolute left-5 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
        className={inputClass}
        aria-label={placeholder}
      />
    </div>
  );
};

export default SearchInput;
