import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";

interface Props {
  control: any;
  name: string;
  label?: string;
  options: { value: any; label: string | number }[];
  error?: any;
  className?: string | null;
  updateValue?: string | null;
}
const SelectInput = ({
  control,
  name,
  label,
  options,
  error,
  className,
  updateValue,
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="w-full">
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                value={updateValue ? updateValue : field.value}
              >
                <SelectTrigger
                  className={cn(
                    "border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full",
                    className
                  )}
                >
                  <SelectValue
                    placeholder={
                      updateValue ? updateValue : field.value || "Select"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label.toString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage>{error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};

export default SelectInput;
