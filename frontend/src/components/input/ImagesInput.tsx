import React from "react";
import { Input } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface Props {
  control: any;
  name: string;
  label?: string;
  error?: any;
  className?: string;
  setPreview:React.Dispatch<React.SetStateAction<null | string>>
}

const ImagesInput = ({ error, control, name, label, className ,setPreview}: Props) => {


  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldOnChange: any
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    fieldOnChange(file);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              className={className}
              onChange={(e) => onChange(e, field.onChange)}
              type="file"
              accept="image/*"
            />
          </FormControl>
          <FormMessage className="absolute">{error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};

export default ImagesInput;
