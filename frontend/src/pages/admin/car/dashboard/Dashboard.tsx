import { CircleDotDashed, Coins, DollarSign, ReceiptText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useLazyQuery } from "@apollo/client";
import { GET_DASHBOARD_STATS } from "@/graphql/queries/booking.queries";
import {
  adjustDateLocalTimeZone,
  formatAmountWithCommas,
} from "@/helpers/helpers";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import AdminRangePicker from "../../partials/AdminRangePicker";
import { DashboardSalesChart } from "../../partials/DashboardSalesChart";

const Dashboard = () => {
  const [dates, setDates] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(1)),
    to: new Date(Date.now()),
  });

  const [getDashboardStats, { data, loading }] = useLazyQuery(
    GET_DASHBOARD_STATS,
    {
      variables: {
        startDate: adjustDateLocalTimeZone(dates?.from),
        endDate: adjustDateLocalTimeZone(dates?.to),
      },
    }
  );

  useEffect(() => {
    async function fetchData() {
      await getDashboardStats({
        variables: {
          startDate: adjustDateLocalTimeZone(dates?.from),
          endDate: adjustDateLocalTimeZone(dates?.to),
        },
      });
    }

    fetchData();
  }, [dates]);

  const handleDateRange = (date: DateRange | undefined) => {
    setDates(date);
  };

  const stats = data?.getDashboardStats;

  return (
    <div className="flex flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        </div>
        <div className="flex justify-end">
          <AdminRangePicker
            dates={dates}
            onDateChange={(date) => handleDateRange(date)}
            disabledBefore={false}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-full" />
              ) : (
                <div className="text-2xl font-bold">
                  ${formatAmountWithCommas(stats?.totalSales)}
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                (Paid, Pending, Cash)
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bookings</CardTitle>
              <ReceiptText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-full" />
              ) : (
                <div className="text-2xl font-bold">
                  {formatAmountWithCommas(stats?.totalBookings)}
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                (Paid, Pending, Cash)
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Amount
              </CardTitle>
              <CircleDotDashed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-full" />
              ) : (
                <div className="text-2xl font-bold">
                  ${formatAmountWithCommas(stats?.totalPendingCash)}
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Booking Amount (Pending, Unpaid)
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cash</CardTitle>
              <Coins className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <Skeleton className="h-8 w-full" />
              ) : (
                <div className="text-2xl font-bold">
                  ${formatAmountWithCommas(stats?.totalPaidCash)}
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                Amount Paid with Cash
              </p>
            </CardContent>
          </Card>
        </div>
        <DropdownMenuSeparator />
        <div className="md:block hidden">
          <DashboardSalesChart data={stats?.sales} dates={dates} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
