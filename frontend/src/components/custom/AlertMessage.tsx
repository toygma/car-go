import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CircleCheckBig } from "lucide-react";

type Props = {
  title: string;
  description: string;
  color?: string;
};

const AlertMessage = ({ title, description, color = "red" }: Props) => {
  return (
    <div className="">
      <Alert
        variant={"destructive"}
        className={color === "green" ? "text-green-800 border-green-800" : ""}
      >
        {color === "red" ? (
          <AlertCircle className="w-4 h-4" color={color} />
        ) : (
          <CircleCheckBig color={color} className="w-4 h-4" />
        )}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  );
};

export default AlertMessage;
