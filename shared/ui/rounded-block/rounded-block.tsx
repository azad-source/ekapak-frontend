import { ReactNode } from "react";

interface RoundedBoxProps {
  children: ReactNode;
  className?: string;
}

export const RoundedBox = ({ children, className = "" }: RoundedBoxProps) => {
  return (
    <div
      className={`relative rounded-sm lg:rounded-xl xl:rounded-xl 2xl:rounded-xl px-5 py-5 2xl:px-7.5 2xl:py-5 bg-white ${className}`}
    >
      {children}
    </div>
  );
};
