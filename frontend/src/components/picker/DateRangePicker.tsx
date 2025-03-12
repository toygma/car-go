import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSearchParams } from "react-router-dom";
import { FormControl, FormField, FormItem } from "../ui/form";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  disabledDates?: [string];
  onDateChange: (date: DateRange | undefined) => void;
  name: string;
  control: any;
}

export function DateRangePicker({
  onDateChange,
  disabledDates,
  className,
  name,
  control,
}: Props) {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("start-date");
  const endDate = searchParams.get("end-date");

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: startDate ? new Date(startDate) : undefined,
    to: endDate ? new Date(endDate) : undefined,
  });

  const handleDateRange = (dates: DateRange | undefined) => {
    setDate(dates);
    if (onDateChange) {
      onDateChange(dates);
    }
  };

  //parsed
  const parsedDates =
    disabledDates?.map((timestamp) => new Date(parseInt(timestamp))) || [];

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <FormField
            name={name}
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Calendar
                    {...field}
                    initialFocus
                    mode="range"
                    selected={date}
                    onSelect={handleDateRange}
                    numberOfMonths={2}
                    disabled={[...parsedDates, { before: new Date() }]}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
