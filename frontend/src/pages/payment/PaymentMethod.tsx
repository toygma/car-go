import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Coins, CreditCard, ReceiptText } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import AlertMessage from "@/components/custom/AlertMessage";
import { useMutation, useQuery } from "@apollo/client";
import { GET_BOOKING_BY_ID } from "@/graphql/queries/booking.queries";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "@/components/custom/Loading";
import NotFound from "@/components/custom/NotFound";
import { useEffect, useState } from "react";
import { UPDATE_BOOKING_MUTATION } from "@/graphql/mutations/booking.mutation";
import { toast } from "@/hooks/use-toast";
import { STRIPE_CHECKOUT_SESSION_MUTATION } from "@/graphql/mutations/payment.mutation";

const PaymentMethod = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const {
    data,
    loading: bookingLoading,
    error: bookingError,
  } = useQuery(GET_BOOKING_BY_ID, {
    variables: { bookingId: params?.id },
  });

  //update
  const [updateBooking] = useMutation(UPDATE_BOOKING_MUTATION, {
    onCompleted: () => {
      toast({
        title: "Booking Updated",
        description: "Your booking has been updated successfully",
        variant: "success",
      });
    },
  });

  //payment_method
  const [
    stripeCheckoutSession,
    { loading: checkoutLoading, error: checkoutError },
  ] = useMutation(STRIPE_CHECKOUT_SESSION_MUTATION, {
    onCompleted: (data) => {
      if (data?.stripeCheckoutSession?.url) {
        navigate(data?.stripeCheckoutSession?.url);
        window.location.href = data?.stripeCheckoutSession?.url;
      }
    },
  });

  useEffect(() => {
    if (bookingError) {
      toast({
        title: `${bookingError}`,
        variant: "destructive",
      });
    }

    if (checkoutError) {
      toast({
        title: `${checkoutError}`,
        variant: "destructive",
      });
    }
  }, [bookingError, checkoutError]);

  const handleBookingUpdate = async () => {
    if (paymentMethod === "cash") {
      const bookingInput = {
        paymentInfo: {
          method: "cash",
        },
      };
      await updateBooking({
        variables: { bookingId: params?.id, bookingInput },
      });
    }
    if (paymentMethod === "card") {
      await stripeCheckoutSession({
        variables: { bookingId: params?.id },
      });
    }
  };

  const booking = data?.getBookingById;

  if (bookingLoading) {
    return <Loading size={60} fullScreen={true} />;
  }

  if (bookingError?.graphQLErrors[0]?.extensions?.code === "NOT_FOUND") {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen mt-24">
      <div className="mb-10 flex items-center">
        <h1 className="text-4xl text-gray-600">Booking # {booking?.id}</h1>
      </div>
      <div className="flex items-center">
        <Card className="h-full w-full max-w-xl me-10">
          <div className="flex items-center justify-start">
            <ReceiptText className="h-12 w-12 ms-5" />
            <CardHeader className="ps-2">
              <CardTitle>Booking Summary</CardTitle>
              <CardDescription>Below are your booking details</CardDescription>
            </CardHeader>
          </div>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-3">
                <div className="flex justify-between">
                  <p className="text-md">Days of Rent:</p>
                  <p className="font-bold">{booking?.daysOfRent}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-md">Rent Per Day:</p>
                  <p className="font-bold">
                    ${booking?.rentPerDay?.toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-md">Total Rent:</p>
                  <p className="font-bold">
                    ${booking?.amount?.rent?.toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-md">Discount:</p>
                  <p className="font-bold">
                    ${booking?.amount?.discount?.toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-md">Tax (15%):</p>
                  <p className="font-bold">
                    ${booking?.amount?.tax?.toFixed(2)}
                  </p>
                </div>
                <DropdownMenuSeparator />

                <div className="flex justify-between">
                  <p className="text-md">Grand Total:</p>
                  <p className="font-bold">
                    ${booking?.amount?.total?.toFixed(2)}
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card className="h-full w-full max-w-xl">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>
              Select your payment method to complete this booking
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <RadioGroup defaultValue="card" className="grid grid-cols-2 gap-6">
              <Label
                htmlFor="card"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                onClick={() => setPaymentMethod("cash")}
              >
                <RadioGroupItem value="card" id="card" className="sr-only" />
                <Coins className="mb-3 h-6 w-6" />
                Cash
              </Label>
              <Label
                htmlFor="paypal"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                onClick={() => setPaymentMethod("card")}
              >
                <RadioGroupItem
                  value="paypal"
                  id="paypal"
                  className="sr-only"
                />
                <CreditCard className="mb-3 h-6 w-6" />
                Card
              </Label>
            </RadioGroup>
            {paymentMethod === "cash" && (
              <AlertMessage
                title="Pay Cash within 2 days"
                description="Otherwise your booking will be removed."
              />
            )}
            {paymentMethod === "card" && (
              <AlertMessage
                title="Instant Confirmation"
                description="Booking will be confirmed after payment"
                color="green"
              />
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleBookingUpdate}
              className="w-full"
              disabled={checkoutLoading}
            >
              <CreditCard className="mr-2 h-4 w-4" />{" "}
              {paymentMethod === "card" ? "Pay with Card" : "Pay Cash"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PaymentMethod;
