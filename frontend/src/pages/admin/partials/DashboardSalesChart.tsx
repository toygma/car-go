import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DateRange } from "react-day-picker";

const chartConfig: ChartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
  bookings: {
    label: "Bookings",
    color: "hsl(var(--chart-2))",
  },
};

interface Props {
  data: {
    date: string;
    sales: number;
    bookings: number;
  }[];
  dates?: DateRange | undefined;
}

export function DashboardSalesChart({ data, dates }: Props) {
  const sums = data.reduce((sum: number, acc: any) => sum + acc.sales, 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales & No of bookings</CardTitle>
        <CardDescription>
          Showing Date between:
          <b>
            {dates?.from?.toLocaleDateString()} -{" "}
            {dates?.to?.toLocaleDateString()}
          </b>
        </CardDescription>
      </CardHeader>
      <ResponsiveContainer
        width="100%"
        height={300}
        className={"flex items-center justify-center w-full"}
      >
        <ChartContainer config={chartConfig} className="w-full h-full">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(5)}
              interval="preserveStartEnd"
              overflow="hidden"
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="sales"
              type="natural"
              fill={chartConfig.sales.color}
              fillOpacity={0.4}
              stroke={chartConfig.sales.color}
            />
            <Area
              dataKey="bookings"
              type="natural"
              fill={chartConfig.bookings.color}
              fillOpacity={0.4}
              stroke={chartConfig.bookings.color}
            />
          </AreaChart>
        </ChartContainer>
      </ResponsiveContainer>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by ${sums} this month{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              <b>
                {dates?.from?.toLocaleDateString()} -{" "}
                {dates?.to?.toLocaleDateString()}
              </b>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
