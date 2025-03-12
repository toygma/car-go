import {
  CarFront,
  CreditCard,
  DollarSign,
  ReceiptText,
  Search,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useQuery } from "@apollo/client";
import { GET_MY_BOOKINGS } from "@/graphql/queries/booking.queries";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import Loading from "@/components/custom/Loading";
import { IBooking } from "shared";
import {
  calculateTablePaginationEnd,
  calculateTablePaginationStart,
  formatDate,
} from "@/helpers/helpers";
import Pagination from "@/components/custom/Pagination";

const MyBookings = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const query = searchParams.get("query");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const { error, data, loading } = useQuery(GET_MY_BOOKINGS, {
    variables: {
      page,
      query,
    },
  });

  const bookings = data?.myBookings?.bookings;
  const pagination = data?.myBookings?.pagination;

  useEffect(() => {
    if (error) {
      toast({
        title: "Something went wrong",
        description: `${error}`,
      });
    }
  }, [error]);

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
    }
  }, [query]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedSearchParams = new URLSearchParams(searchParams);
    if (searchQuery) {
      updatedSearchParams.set("query", searchQuery);
    } else {
      updatedSearchParams.delete("query");
    }

    navigate(`/me/bookings?${updatedSearchParams.toString()}`);
  };

  if (loading) {
    return <Loading size={60} fullScreen={true} />;
  }

  return (
    <div>
      <div className="flex min-h-screen w-full flex-col bg-muted/40 ">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 mt-32">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <h1 className="text-3xl font-bold mt-5">Your Bookings Stats</h1>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Amount
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${data?.myBookings?.totalAmount}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total Amount you spent on Bookings
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Bookings
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data?.myBookings?.totalBookings}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total No of Cars you booked for rental
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Unpaid Bookings
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data?.myBookings?.totalUnpaidBookings}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    No of Bookings, you have not paid for
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="flex flex-col md:flex-row mb-4">
                <div className="flex-1">
                  <CardTitle>Bookings</CardTitle>
                  <CardDescription>View your booking details</CardDescription>
                </div>
                <form onSubmit={submitHandler}>
                  <div className="relative ml-auto flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Enter booking ID"
                      className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        Image
                      </TableHead>
                      <TableHead>Car</TableHead>
                      <TableHead>Booking ID</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Payment Status
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Amount Paid
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings?.map((book: IBooking) => (
                      <TableRow key={book?.id}>
                        <TableCell className="hidden sm:table-cell">
                          {bookings?.car?.images[0]?.url ? (
                            <img
                              src={bookings?.car?.images[0]?.url}
                              className="aspect-square rounded-md object-cover"
                              height={"60"}
                              width={"60"}
                            />
                          ) : (
                            <CarFront color="gray" className="h-8 w-8" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {book.car.name}
                        </TableCell>
                        <TableCell className="font-medium">
                          {book.id.slice(0, 10)}...
                          <p>{formatDate(book.createdAt)}</p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {book.paymentInfo.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          ${book.amount.total}
                        </TableCell>
                        <TableCell>
                          {book?.paymentInfo?.status === "pending" && (
                            <Link to={`/booking/${book?.id}/payment_method`}>
                              <Button>
                                <CreditCard className="mr-2 h-4 w-4" /> Pay
                              </Button>
                            </Link>
                          )}
                          {book?.paymentInfo?.status === "paid" && (
                            <Link to={`/me/bookings/invoice/${book.id}`}>
                              <Button className="w-22">
                                <ReceiptText /> Invoice
                              </Button>
                            </Link>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              {pagination?.totalCount > 0 && (
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing{" "}
                    {calculateTablePaginationStart(
                      page,
                      pagination?.resPerPage
                    )}
                    -{" "}
                    {calculateTablePaginationEnd(
                      page,
                      pagination?.resPerPage,
                      pagination?.totalCount
                    )}{" "}
                    of <strong>{pagination?.totalCount}</strong> bookings
                  </div>
                </CardFooter>
              )}
            </Card>
          </main>
        </div>
        <Pagination
          resPerPage={pagination.resPerPage}
          totalCount={pagination.totalCount}
        />
      </div>
    </div>
  );
};

export default MyBookings;
