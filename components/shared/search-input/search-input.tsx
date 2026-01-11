"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LoupeIcon } from "../icons/loupe-icon";
import { debounce } from "lodash";

type SizeProp = "small" | "medium" | "large";

const sizeConfig: Record<SizeProp, string> = {
  small: "h-10 text-sm",
  medium: "h-13 text-base",
  large: "h-15 text-lg",
};

interface SearchInputProps {
  placeholder?: string;
  size?: SizeProp;
  className?: string;
  onChange?: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Поиск",
  size = "medium",
  className = "",
  onChange,
}) => {
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Инициализируем значение из URL
  const initialValue = searchParams.get("search") || "";
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [pathname]);

  const handleInput = (val: string) => {
    onChange?.(val);
    const params = new URLSearchParams(searchParams.toString());
    if (val) {
      params.set("search", val);
      router.push(`/search?${params.toString()}`);
    } else {
      params.delete("search");
      router.push(`/`);
    }
  };

  // Дебаунс для обновления внешнего состояния и URL
  const debouncedUpdate = debounce(handleInput, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedUpdate(e.target.value);
  };

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

  const handleImmediateSearch = () => {
    if (inputRef.current) {
      debouncedUpdate(inputRef.current.value);
    }
  };

  const handleLoupeClick = () => {
    inputRef.current?.focus();
    handleImmediateSearch();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleImmediateSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex items-center box-border ${className}`}
    >
      <button
        type="submit"
        onClick={handleLoupeClick}
        className="absolute left-5 w-5 h-5 flex items-center justify-center"
        aria-label="Начать поиск"
      >
        <LoupeIcon className="pointer-events-none" />
      </button>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={inputClass}
        aria-label={placeholder}
      />
    </form>
  );
};

export default SearchInput;
