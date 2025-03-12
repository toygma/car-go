import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { SelectedValues } from "@/pages/home/partials/sectionRepair/partials/right/RepairRight";
import { useController } from "react-hook-form";

interface Props {
  label: string;
  products: string[];
  name: keyof SelectedValues;
  control: any;
  error: any;
}

const PopoverInput = ({
  label,
  products = [],
  name,
  error,
  control,
}: Props) => {
  const { field } = useController({ name, control });
  return (
    <Popover>
      <FormLabel className="mb-2 mt-2">{label}</FormLabel>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex h-9 items-center justify-between whitespace-nowrap bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full font-normal overflow-hidden"
        >
         {field.value.length > 0 ? field.value.join(" | ") : "Select"}
          <ChevronDown className="text-gray-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2">
        <Command>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {products?.map((option) => {
                return (
                  <CommandItem
                    key={option}
                  >
                    <FormField
                      control={control}
                      name={name}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  onCheckedChange={(checked) => {
                                    const updatedValues = checked
                                      ? [...field.value, option] 
                                      : field.value.filter(
                                          (item: string) => item !== option
                                        );
                                    field.onChange(updatedValues); 
                                  }}
                                  checked={field.value.includes(option)}
                                />
                                <span>{option}</span>
                              </div>
                            </FormControl>
                            <FormMessage>{error?.message}</FormMessage>
                          </FormItem>
                        );
                      }}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverInput;
