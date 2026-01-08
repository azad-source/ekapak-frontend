import { ReactNode } from "react";

interface RoundedBoxProps {
  children: ReactNode;
  className?: string;
}

export const RoundedBox = ({ children, className = "" }: RoundedBoxProps) => {
  return (
    <div
      className={`rounded-sm lg:rounded-xl xl:rounded-xl 2xl:rounded-xl px-7.5 py-5 ${className}`}
    >
      {children}
    </div>
  );
};
