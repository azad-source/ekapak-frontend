import type { RefAttributes, SVGProps } from "react";

type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type SvgIconProps = RefAttributes<SVGSVGElement> & SVGAttributes;

export const RightArrowIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.495 16.495C18.7683 16.2216 18.7683 15.7784 18.495 15.505L14.0402 11.0503C13.7668 10.7769 13.3236 10.7769 13.0503 11.0503C12.7769 11.3236 12.7769 11.7668 13.0503 12.0402L17.0101 16L13.0503 19.9598C12.7769 20.2332 12.7769 20.6764 13.0503 20.9497C13.3236 21.2231 13.7668 21.2231 14.0402 20.9497L18.495 16.495ZM17 16L17 16.7L18 16.7L18 16L18 15.3L17 15.3L17 16Z"
        fill="currentColor"
      />
    </svg>
  );
};
