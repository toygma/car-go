import Loading from "@/components/custom/Loading";
import {
  Card,
  CardContent,
  CardDescription,
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
import { useMutation, useQuery } from "@apollo/client";
import { ICoupon } from "shared/src/interfaces";
import { DELETE_MUTATION_FAQ } from "@/graphql/mutations/faq.mutation";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { formatDate } from "@/helpers/helpers";
import { GET_ALL_COUPONS } from "@/graphql/queries/coupon.queries";
import { useParams } from "react-router-dom";
import { CouponDialog } from "./partials/CouponDialog";

const ListCoupons = () => {
  const params = useParams();
  const { data, loading, refetch } = useQuery(GET_ALL_COUPONS, {
    variables: {
      carId: params?.id,
    },
  });

  const coupons = data?.getAllCoupons;

  //DELETE faq
  const [deleteFaq, { loading: deleteFaqLoading }] = useMutation(
    DELETE_MUTATION_FAQ,
    {
      onCompleted: () => {
        refetch();
        toast({
          title: "Successfully",
          variant: "success",
        });
      },
    }
  );

  const deleteFaqHandler = async (id: string) => {
    await deleteFaq({
      variables: { faqId: id },
    });
  };

  if (loading) {
    return <Loading size={60} fullScreen={true} />;
  }

  return (
    <div className="relative">
      <Card>
        <CardHeader className="flex flex-col md:flex-row mb-4">
          <div className="flex-1">
            <CardTitle>Coupons</CardTitle>
            <CardDescription>View your Coupons details</CardDescription>
          </div>
          <div className="relative ml-auto flex-1 md:grow-0">
            <CouponDialog refetchCoupons={refetch} carId={params?.id} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  NAME
                </TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coupons?.map((coupon: ICoupon) => (
                <TableRow key={coupon?.id}>
                  <TableCell className="hidden sm:table-cell">
                    {coupon?.name}
                  </TableCell>
                  <TableCell>{coupon?.code}</TableCell>
                  <TableCell>{coupon?.discountPercent}%</TableCell>
                  <TableCell>
                    {formatDate(coupon?.expiry?.toString())}
                  </TableCell>
                  <TableCell>{formatDate(coupon?.createdAt)}</TableCell>
                  <TableCell>
                    <CouponDialog
                      refetchCoupons={refetch}
                      updateCouponData={coupons}
                    />
                    <span onClick={() => deleteFaqHandler(coupon?.id)}>
                      <Button
                        variant={"destructive"}
                        className="ms-2"
                        size={"icon"}
                        loading={deleteFaqLoading}
                        disabled={deleteFaqLoading}
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
      </Card>
    </div>
  );
};

export default ListCoupons;
