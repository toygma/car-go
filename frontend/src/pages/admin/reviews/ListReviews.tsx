import Loading from "@/components/custom/Loading";
import Pagination from "@/components/custom/Pagination";
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
import {
  calculateTablePaginationEnd,
  calculateTablePaginationStart,
  formatDate,
  toastNotification,
} from "@/helpers/helpers";
import { toast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@apollo/client";
import { Search, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IReview } from "shared";
import { GET_ALL_REVIEWS } from "@/graphql/queries/review.queries";
import { DELETE_REVIEW_MUTATION } from "@/graphql/mutations/review.mutation";

const ListReviews = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const query = searchParams.get("car");
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { error, data, loading, refetch } = useQuery(GET_ALL_REVIEWS, {
    variables: {
      page,
      ...(query && { query }),
    },
  });

  const reviews = data?.getAllReviews?.reviews;

  const pagination = data?.getAllReviews?.pagination;

  useEffect(() => {
    if (query) {
      setSearchQuery(query);
    }
  }, [query]);

  //DELETE review
  const [deleteReview, { loading: deleteReviewLoading, error: deleteError }] =
    useMutation(DELETE_REVIEW_MUTATION, {
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
      await deleteReview({
        variables: { reviewId: id },
      });
    } catch (error) {
      toastNotification(error);
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedSearchParams = new URLSearchParams(searchParams);
    if (searchQuery) {
      updatedSearchParams.set("car", searchQuery);
    } else {
      updatedSearchParams.delete("car");
    }

    navigate(`/admin/reviews?car=${updatedSearchParams.toString()}`);
  };

  if (loading) {
    return <Loading size={60} fullScreen={true} />;
  }

  return (
    <div className="relative">
      <Card>
        <CardHeader className="flex flex-col md:flex-row mb-4">
          <div className="flex-1">
            <CardTitle>Reviews</CardTitle>
            <CardDescription>View your review details</CardDescription>
          </div>
          <form onSubmit={submitHandler}>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Enter reviews ID"
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
                <TableHead>Comment</TableHead>
                <TableHead className="hidden md:table-cell">Rating</TableHead>
                <TableHead className="hidden md:table-cell">Car</TableHead>
                <TableHead className="hidden md:table-cell">
                  Created At
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews?.map((review: IReview) => (
                <TableRow key={review?.id}>
                  <TableCell className="hidden sm:table-cell">
                    {review?.id}
                  </TableCell>
                  <TableCell>{review?.comment}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {review?.rating}
                  </TableCell>
                  <TableCell>{review?.car?.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatDate(review?.createdAt)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span onClick={() => deleteCarHandler(review?.id)}>
                      <Button
                        variant={"destructive"}
                        className="ms-2"
                        size={"icon"}
                        loading={deleteReviewLoading}
                        disabled={deleteReviewLoading}
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
              of <strong>{pagination?.totalCount}</strong> reviews
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

export default ListReviews;
