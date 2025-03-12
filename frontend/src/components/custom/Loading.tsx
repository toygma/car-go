import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

interface Props {
  fullScreen?: boolean;
  size?: number;
  className?: string;
}

const Loading = ({ className, fullScreen = false, size = 5 }: Props) => {
  const spinner = (
    <LoaderCircle className={cn("animate-spin", className)} size={size} />
  );

  if (fullScreen) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Loading;
