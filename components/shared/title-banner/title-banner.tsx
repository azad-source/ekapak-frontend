import { RoundedBox } from "@/components/shared/rounded-block/rounded-block";
import CheckboxImg from "@/public/Checkbox.png";
import Image from "next/image";

interface IProps {
  name: string;
  description?: string;
  className?: string;
}

export const TitleBanner: React.FC<IProps> = ({
  name,
  description,
  className,
}) => {
  return (
    <RoundedBox className={`2xl:px-10 2xl:py-10 ${className}`}>
      <div className="flex flex-col gap-5 w-[calc(100%-60px)]">
        <div className="text-2xl font-bold 2xl:text-5xl z-10">{name}</div>
        {!!description && (
          <div className="text-sm 2xl:text-lg z-10">{description}</div>
        )}
      </div>
      <Image
        src={CheckboxImg}
        alt="checkbox image"
        className="absolute right-5 bottom-[15%] w-auto h-[40%] sm:h-[65%] md:h-[70%] 2xl:w-auto 2xl:right-15.5 2xl:top-1/2 2xl:-translate-y-1/2"
      />
    </RoundedBox>
  );
};
