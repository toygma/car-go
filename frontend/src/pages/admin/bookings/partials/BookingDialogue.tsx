import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useMutation } from "@apollo/client";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { formatDate, toastNotification } from "@/helpers/helpers";

import { IBooking } from "shared";
import { Pencil } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UPDATE_BOOKING_MUTATION } from "@/graphql/mutations/booking.mutation";

interface Props {
  updateBookingData: IBooking;
  refetchBookings: () => void;
}

export function BookingDialogue({ updateBookingData, refetchBookings }: Props) {
  const [paymentStatus, setPaymentStatus] = useState(
    updateBookingData?.paymentInfo?.status
  );
  const [paymentMethod, setPaymentMethod] = useState(
    updateBookingData?.paymentInfo?.method
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [updateBooking, { loading, error }] = useMutation(
    UPDATE_BOOKING_MUTATION,
    {
      onCompleted: () => {
        refetchBookings();
        toast({
          title: "Comment posted",
          variant: "success",
        });
      },
    }
  );

  useEffect(() => {
    if (error) {
      toastNotification(error);
    }
  }, [error]);

  const onSubmit = async () => {
    const bookingInput = {
      paymentInfo: {
        status: paymentStatus,
        method: paymentMethod,
      },
    };
    await updateBooking({
      variables: {
        bookingId: updateBookingData?.id,
        bookingInput,
      },
    });
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={() => setIsDialogOpen(true)}
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Booking</DialogTitle>
          <DialogDescription>Update Booking details here</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Car</TableCell>
                <TableCell>
                  <>
                    {updateBookingData?.car?.name}
                    <p className="text-xs text-gray-400">
                      {updateBookingData?.car?.id}
                    </p>
                  </>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>
                  <>
                    {updateBookingData?.user?.name}
                    <p className="text-xs text-gray-400">
                      {updateBookingData?.user?.id}
                    </p>
                  </>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Start Date</TableCell>
                <TableCell>
                  {formatDate(updateBookingData?.startDate?.toString())}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>End Date</TableCell>
                <TableCell>
                  {formatDate(updateBookingData?.endDate?.toString())}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Days Of Rent</TableCell>
                <TableCell>{updateBookingData?.daysOfRent}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Total Amount</TableCell>
                <TableCell>{updateBookingData?.amount?.total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="grid gap-6 py-3">
          <div className="grid gap-3">
            <Label>Payment Status</Label>
            <Select
              value={paymentStatus}
              onValueChange={(value) => setPaymentStatus(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Payment Status</SelectLabel>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label>Payment Method</Label>
            <Select
              value={paymentStatus}
              onValueChange={(value) => setPaymentMethod(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Payment Method</SelectLabel>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSubmit} disabled={loading} loading={loading}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
