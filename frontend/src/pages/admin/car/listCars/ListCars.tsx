import Loading from "@/components/custom/Loading";
import Pagination from "@/components/custom/Pagination";
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
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DELETE_CAR_MUTATION } from "@/graphql/mutations/car.mutation";
import { GET_ALL_QUERIES } from "@/graphql/queries/car.queries";
import {
  calculateTablePaginationEnd,
  calculateTablePaginationStart,
  toastNotification,
} from "@/helpers/helpers";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@apollo/client";
import {
  CarFront,
  Pencil,
  PlusCircle,
  Search,
  Tags,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ICar } from "shared";

const ListCars = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const query = searchParams.get("query");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const { error, data, loading, refetch } = useQuery(GET_ALL_QUERIES, {
    variables: {
      page,
      query,
    },
  });

  const cars = data?.getAllCars?.car;

  const pagination = data?.getAllCars?.pagination;

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
    }
  }, [query]);

  //DELETE car
  const [deleteCar, { loading: deleteCarLoading, error: deleteError }] =
    useMutation(DELETE_CAR_MUTATION, {
      onCompleted: () => {
        refetch();
        toast({
          title: "Successfully",
          variant: "success",
        });
      },
    });

  useEffect(() => {
    if (error) {
      toast({
        title: "Something went wrong",
        description: `${error}`,
      });
    }
    if (deleteError) {
      toast({
        title: "Something went wrong",
        description: `${deleteError}`,
      });
    }
  }, [error, deleteError]);

  const deleteCarHandler = async (id: string) => {
    try {
      await deleteCar({
        variables: { carId: id },
      });
    } catch (error) {
      toastNotification(error);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedSearchParams = new URLSearchParams(searchParams);
    if (searchQuery) {
      updatedSearchParams.set("query", searchQuery);
    } else {
      updatedSearchParams.delete("query");
    }

    navigate(`/admin/cars?${updatedSearchParams.toString()}`);
  };

  if (loading) {
    return <Loading size={60} fullScreen={true} />;
  }

  return (
    <div className="relative">
      <Link
        to={"/admin/cars/new"}
        className="absolute md:top-20 top-32 right-12"
      >
        <Button size={"sm"} className="h-8 gap-1">
          <PlusCircle className="w-3.5 h-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Car
          </span>
        </Button>
      </Link>
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
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">
                  Rent Per Day
                </TableHead>
                <TableHead className="hidden md:table-cell">ID</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cars?.map((car: ICar) => (
                <TableRow key={car?.id}>
                  <TableCell className="hidden sm:table-cell">
                    {car?.images[0]?.url ? (
                      <img
                        src={cars?.car?.images[0]?.url}
                        className="aspect-square rounded-md object-cover"
                        height={"60"}
                        width={"60"}
                      />
                    ) : (
                      <CarFront color="gray" className="h-8 w-8" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{car?.name}</TableCell>
                  <TableCell>
                    {" "}
                    <Badge variant="outline">{car?.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    ${car.rentPerDay}
                  </TableCell>
                  <TableCell>
                    <TableCell className="font-medium">{car?.id}</TableCell>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Link to={`/admin/cars/new/${car?.id}`}>
                      <Button
                        variant={"outline"}
                        className="ms-2 "
                        size={"icon"}
                      >
                        <Pencil />
                      </Button>
                    </Link>
                    <Link to={`/admin/coupons/${car?.id}`}>
                      <Button
                        variant={"outline"}
                        className="ms-2"
                        size={"icon"}
                      >
                        <Tags className="w-4 h-4" />
                      </Button>
                    </Link>
                    <span onClick={() => deleteCarHandler(car?.id)}>
                      <Button
                        variant={"destructive"}
                        className="ms-2"
                        size={"icon"}
                        loading={deleteCarLoading}
                        disabled={deleteCarLoading}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </span>
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
              {calculateTablePaginationStart(page, pagination?.resPerPage)}-{" "}
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
      <Pagination
        resPerPage={pagination?.resPerPage}
        totalCount={pagination?.totalCount}
      />
    </div>
  );
};

export default ListCars;
