import EditInput from "@/components/input/EditInput";
import { Form } from "@/components/ui/form";
import {
  createDetailSchema,
  detailMenuSchema,
} from "@/validation/details/detailMenuSchema";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DateRangePicker } from "@/components/picker/DateRangePicker";
import { Button } from "@/components/ui/button";
import { useMutation, useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/apolloVars";
import { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";
import {
  adjustDateLocalTimeZone,
  calculateRent,
  formatDate,
  getAllDatesBetween,
} from "@/helpers/helpers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NEW_BOOKING_MUTATION } from "@/graphql/mutations/booking.mutation";
import AlertMessage from "@/components/custom/AlertMessage";

type Props = {
  carId: string;
  rentPerDay?: number;
  disableDates?: [string];
};

const BookingForm = ({ carId, rentPerDay = 0, disableDates }: Props) => {
  const user = useReactiveVar(userVar);
  const [totalPer, setTotalPer] = useState({
    rent: 0,
    tax: 0,
    discount: 0,
    total: 0,
  });
  const [selectedDates, setSelectedDates] = useState<DateRange | undefined>(
    undefined
  );
  const [available, setAvailable] = useState<boolean>(false);
  const navigate = useNavigate();
  const [createBooking, { loading }] = useMutation(NEW_BOOKING_MUTATION);

  const form = useForm<createDetailSchema>({
    resolver: zodResolver(detailMenuSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNo: "",
      additionalNotes: "",
      bookingDates: 0,
    },
    mode: "onChange",
  });

  const daysRent = form.watch("bookingDates");

  const bookedDates = disableDates?.map(formatDate);

  useEffect(() => {
    const { rent, tax, discount, total } = calculateRent(daysRent, rentPerDay);
    setTotalPer({ rent, tax, discount, total });
  }, [daysRent, rentPerDay]);

  const dateChangeHandler = (date: DateRange | undefined) => {
    if (!date?.from || !date?.to) {
      return;
    }

    const allDates = getAllDatesBetween(date.from, date.to);
    const filteredDates = allDates.filter((element: any) =>
      bookedDates?.includes(element)
    );

    if (filteredDates.length > 0) {
      setAvailable(false);
    } else {
      setAvailable(true);
    }

    const formattedBookingDates =
      differenceInDays(
        date.to.setHours(0, 0, 0, 0),
        date.from.setHours(0, 0, 0, 0)
      ) + 1;
    setSelectedDates(date);
    form.setValue("bookingDates", formattedBookingDates);
  };

  const onSubmit = async (value: createDetailSchema) => {
    const newBookingData = {
      amount: {
        total: totalPer.total,
        discount: totalPer.discount,
        rent: totalPer.rent,
        tax: totalPer.tax,
      },
      customer: {
        name: value.name,
        email: value.email,
        phoneNo: value.phoneNo,
      },
      daysOfRent: daysRent,
      rentPerDay,
      car: carId,
      startDate: adjustDateLocalTimeZone(selectedDates?.from),
      endDate: adjustDateLocalTimeZone(selectedDates?.to),
      additionalNotes: value.additionalNotes,
    };

    const { data } = await createBooking({
      variables: { bookingInput: newBookingData },
    });

    if (data?.createBooking?.id) {
      navigate(`/booking/${data.createBooking.id}/payment_method`);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="mt-8 w-full">
            <CardContent className="w-full pt-4 flex flex-col gap-4">
              <EditInput
                control={form.control}
                name="name"
                placeholder="Name"
                error={form.formState.errors.name}
              />
              <EditInput
                control={form.control}
                name="email"
                placeholder="Email"
                error={form.formState.errors.email}
              />
              <EditInput
                control={form.control}
                name="phoneNo"
                placeholder="PhoneNo"
                error={form.formState.errors.phoneNo}
              />
              <DateRangePicker
                name="bookingDates"
                control={form.control}
                onDateChange={dateChangeHandler}
                disabledDates={disableDates}
              />
              {form.formState.errors.bookingDates ? (
                <span className="text-[0.8rem] font-medium text-destructive">
                  {form.formState.errors.bookingDates.message}
                </span>
              ) : null}
              {available === false && (
                <AlertMessage
                  title="Not Available"
                  description="Dates are not available for booking.Try again!"
                />
              )}
              <EditInput
                control={form.control}
                name="additionalNotes"
                multiline
                placeholder="Type your additional notes here."
                error={form.formState.errors.additionalNotes}
              />
            </CardContent>
          </Card>
          <br />
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>
                Take a look at your booking & confirm
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h1>Days of rent:</h1>
                <span>{daysRent}</span>
              </div>
              <div className="flex items-center justify-between">
                <h1>Rent Per Day:</h1>
                <span>${rentPerDay.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <h1>Total Rent:</h1>
                <span>${totalPer.rent.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <h1>Tax(15%):</h1>
                <span>${totalPer.tax.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <h1 className="font-bold">Est. Total:</h1>
                <span className="font-bold">${totalPer.total.toFixed(2)}</span>
              </div>
              <div>
                {user && available ? (
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                    loading={loading}
                  >
                    Proceed
                  </Button>
                ) : (
                  <Button type="submit" disabled className="w-full">
                    {available || !user
                      ? "Please login"
                      : "Not available dates"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
};

export default BookingForm;
