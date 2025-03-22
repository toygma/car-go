import AlertMessage from "@/components/custom/AlertMessage";
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
import { Label } from "@/components/ui/label";
import { GET_COUPON_DETAILS } from "@/graphql/queries/coupon.queries";
import { updateSearchParams } from "@/helpers/helpers";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

interface Props {
  onCouponChange: (discount: number) => void;
}

const CouponCard = ({ onCouponChange }: Props) => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const params = useParams();

  const [coupon, setCoupon] = useState(searchParams.get("coupon") || "");

  const [getCoupon, { data, error }] = useLazyQuery(GET_COUPON_DETAILS);

  useEffect(() => {
    if (coupon && coupon.trim() !== "") {
      getCoupon({
        variables: {
          couponCode: coupon,
          carId: params?.id,
        },
      });
    }
  }, [coupon]);

  useEffect(() => {
    onCouponChange?.(data?.getCoupon?.discountPercent || 0);
  }, [data]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    searchParams = updateSearchParams(searchParams, "coupon", coupon);

    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;

    navigate(newPathname, { replace: true });

    getCoupon({
      variables: {
        couponCode: coupon,
        carId: params?.id,
      },
    });
  };

  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>Have Coupon?</CardTitle>
        <CardDescription>Enter below to avail discount</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-3">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="coupon">Coupon Code</Label>
              <Input
                id="coupon"
                type="search"
                placeholder="Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="mt-2">
              <AlertMessage
                title="Invalid Coupon!"
                description="Coupon is invalid or expired"
              />
            </div>
          )}

          {data && (
            <div className="mt-2">
              <AlertMessage
                title="Coupon Applied!"
                description={`You have saved ${data?.getCoupon?.discountPercent}%`}
                color="green"
              />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Apply Coupon
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CouponCard;
