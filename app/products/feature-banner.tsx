import { RoundedBox } from "@/shared/ui/rounded-block/rounded-block";
import CheckboxImg from "@/public/Checkbox.png";
import Image from "next/image";

interface IProps {
  className?: string;
}

export const FeatureBanner: React.FC<IProps> = ({ className }) => {
  return (
    <RoundedBox className={`2xl:px-10 2xl:py-10 ${className}`}>
      <div className="flex flex-col gap-5 w-[calc(100%-60px)]">
        <div className="text-2xl font-bold 2xl:text-5xl z-10">
          Производство гибкой пластиковой упаковки
        </div>
        <div className="text-sm 2xl:text-lg z-10">
          По индивидуальным размерам и&nbsp;в&nbsp;минимальные сроки
        </div>
      </div>
      <Image
        src={CheckboxImg}
        alt="checkbox image"
        className="absolute right-5 bottom-5 w-12.5 h-auto 2xl:w-auto 2xl:right-15.5 2xl:top-1/2 2xl:-translate-y-1/2"
      />
    </RoundedBox>
  );
};
