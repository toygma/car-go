import Loading from "@/components/custom/Loading";
import Pagination from "@/components/custom/Pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { GET_ALL_USERS } from "@/graphql/queries/user.queries";
import {
  calculateTablePaginationEnd,
  calculateTablePaginationStart,
  formatDate,
  getUserName,
  toastNotification,
} from "@/helpers/helpers";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@apollo/client";
import { Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IUser } from "shared";
import { UsersDialogue } from "./partials/UsersDialogue";
import { DELETE_USER_MUTATION } from "@/graphql/mutations/user.mutations";

const ListUsers = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const query = searchParams.get("query");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const { error, data, loading, refetch } = useQuery(GET_ALL_USERS, {
    variables: {
      page,
      query,
    },
  });

  const users = data?.getAllUsers?.users;

  const pagination = data?.getAllUsers?.pagination;

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
    }
  }, [query]);

  //DELETE user
  const [deleteUser, { loading: deleteUserLoading, error: deleteError }] =
    useMutation(DELETE_USER_MUTATION, {
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
      await deleteUser({
        variables: { userId: id },
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

    navigate(`/admin/bookings?${updatedSearchParams.toString()}`);
  };

  if (loading) {
    return <Loading size={60} fullScreen={true} />;
  }

  return (
    <div className="relative">
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
                  ID
                </TableHead>
                <TableHead>Avatar</TableHead>
                <TableHead>User Name</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Roles</TableHead>
                <TableHead className="hidden md:table-cell">
                  CreatedAt
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user: IUser) => (
                <TableRow key={user?.id}>
                  <TableCell className="hidden sm:table-cell">
                    {user?.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    {" "}
                    <Avatar className="cursor-pointer my-1">
                      <AvatarImage src={user?.avatar?.url} />
                      <AvatarFallback className="uppercase cursor-pointer">
                        {getUserName(user?.name)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{user?.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user?.email}
                  </TableCell>
                  <TableCell>
                    {user?.role?.map((role: string) => (
                      <div key={role}>
                        <Badge variant={"outline"} className="my-1">
                          {role}
                        </Badge>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(user?.createdAt)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <UsersDialogue
                      refetchBookings={refetch}
                      updateUserData={user}
                    />
                    <span onClick={() => deleteCarHandler(user?.id)}>
                      <Button
                        variant={"destructive"}
                        className="ms-2"
                        size={"icon"}
                        loading={deleteUserLoading}
                        disabled={deleteUserLoading}
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

export default ListUsers;
