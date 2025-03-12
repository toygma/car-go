import { cn } from "@/lib/utils";

interface Props {
  title: string;
  className?: string;
}

const Title = ({ title, className }: Props) => {
  return (
    <div className="text-center mb-12 relative">
      {/* Arka Plandaki Büyük "CARS" Yazısı */}
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center text-[8rem] font-bold text-gray-800 opacity-10 select-none",
          className
        )}
      >
        {title}
      </span>

      {/* Başlık */}
      <h1 className="text-6xl font-semibold font-poppins  text-black relative z-10">
        {title}
      </h1>

      {/* Alt Çizgi */}
      <span className="bg-orange-400 w-24 h-[3px] absolute -bottom-4 left-1/2 transform -translate-x-1/2"></span>
    </div>
  );
};

export default Title;
