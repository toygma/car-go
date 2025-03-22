import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@apollo/client";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { toastNotification } from "@/helpers/helpers";

import { Pencil } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import EditInput from "@/components/input/EditInput";
import { ICoupon } from "shared/src/interfaces";
import { UPDATE_MUTATION_FAQ } from "@/graphql/mutations/faq.mutation";
import {
  couponSchema,
  createCouponSchema,
} from "@/validation/coupon/coupon.schema";
import { CREATE_MUTATION_COUPON } from "@/graphql/mutations/coupon.mutation";
import CalenderInput from "@/components/input/CalenderInput";

interface Props {
  carId?: string;
  updateCouponData?: ICoupon;
  refetchCoupons: () => void;
}

export function CouponDialog({
  carId,
  updateCouponData,
  refetchCoupons,
}: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const defaultValues = updateCouponData
    ? {
        ...updateCouponData,
        expiry: new Date(updateCouponData.expiry?.toString()),
      }
    : {
        name: "",
        code: "",
        discountPercent: 0,
        expiry: new Date(),
      };

  const form = useForm<createCouponSchema>({
    resolver: zodResolver(couponSchema),
    mode: "onChange",
    defaultValues,
  });

  const [createCoupon, { loading, error }] = useMutation(
    CREATE_MUTATION_COUPON,
    {
      onCompleted: () => {
        refetchCoupons();
        form.reset();
        toast({
          title: "Coupon created success",
          variant: "success",
        });
      },
    }
  );

  const [updateFaq, { loading: updateLoading }] = useMutation(
    UPDATE_MUTATION_FAQ,
    {
      onCompleted: () => {
        refetchCoupons();
        form.reset();
        toast({
          title: "Coupon updated success",
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

  const onSubmit = async (data: createCouponSchema) => {
    const couponInput = {
      name: data.name,
      code: data.code,
      discountPercent: data.discountPercent,
      expiry: data.expiry,
    };

    if (updateCouponData?.id) {
      await updateFaq({
        variables: { couponId: updateCouponData?.id, couponInput },
      });
    } else {
      await createCoupon({
        variables: { couponInput: { ...couponInput, car: carId } },
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {updateCouponData ? (
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => setIsDialogOpen(true)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
        ) : (
          <Button variant={"outline"} onClick={() => setIsDialogOpen(true)}>
            Create New Coupon
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              {updateCouponData ? "Edit Coupon" : "Create New Coupon"}{" "}
              <DialogDescription>
                {updateCouponData
                  ? "Update Coupon details here"
                  : "Create New Coupon here"}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <EditInput
                  control={form.control}
                  name="name"
                  error={form.formState.errors.name}
                  placeholder="Coupon Name"
                  label="Name"
                />

                <EditInput
                  control={form.control}
                  name="code"
                  error={form.formState.errors.code}
                  placeholder="Coupon Code"
                  label="Code"
                />

                <EditInput
                  control={form.control}
                  name="discountPercent"
                  error={form.formState.errors.discountPercent}
                  placeholder="Discount (%)"
                  label="Discount Percent"
                  type="number"
                />
                <CalenderInput
                  control={form.control}
                  error={form.formState.errors.expiry}
                  name="expiry"
                  label="Expiry"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={loading || updateLoading}
                loading={loading || updateLoading}
              >
                {updateCouponData ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
