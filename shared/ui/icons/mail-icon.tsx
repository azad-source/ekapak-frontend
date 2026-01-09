import type { RefAttributes, SVGProps } from "react";

type SVGAttributes = Partial<SVGProps<SVGSVGElement>>;
type SvgIconProps = RefAttributes<SVGSVGElement> & SVGAttributes;

export const MailIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        x="0.5"
        y="2.5"
        width="18.2"
        height="15.8"
        rx="3.5"
        stroke="black"
      />
      <path
        d="M4.80029 6.80078L9.60029 9.20078L14.4003 6.80078"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
