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
import { useMutation } from "@apollo/client";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { toastNotification } from "@/helpers/helpers";

import { Pencil } from "lucide-react";

import { UPDATE_USER_MUTATION } from "@/graphql/mutations/user.mutations";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUpdateProfileSchema,
  updateProfileSchema,
} from "@/validation/profile/profile.menu.schema";
import { Form, FormLabel } from "@/components/ui/form";
import EditInput from "@/components/input/EditInput";
import { Checkbox } from "@/components/ui/checkbox";
import { IUser, UserRoles } from "shared/src/interfaces";
interface Props {
  updateUserData: IUser;
  refetchBookings: () => void;
}

export function UsersDialogue({ updateUserData, refetchBookings }: Props) {
  const [selectedRoles, setSelectedRoles] = useState(
    updateUserData?.role || []
  );

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      refetchBookings();
      toast({
        title: "Comment posted",
        variant: "success",
      });
    },
  });

  useEffect(() => {
    if (error) {
      toastNotification(error);
    }
  }, [error]);

  const handleCheckBoxChange = (role: string) => {
    setSelectedRoles((prev: string[]) =>
      prev?.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const form = useForm<createUpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (updateUserData) {
      form.setValue("name", updateUserData.name || "");
      form.setValue("email", updateUserData.email || "");
      form.setValue("phoneNo", updateUserData.phoneNo || "");
      setSelectedRoles(updateUserData.role || []);
    }
  }, [updateUserData, form]);

  const onSubmit = async (data: createUpdateProfileSchema) => {
    const userInput = {
      name: data.name,
      email: data.email,
      phoneNo: data.phoneNo,
      role: selectedRoles,
    };

    await updateUser({
      variables: { userId: updateUserData?.id, userInput },
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
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>Update User details here</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <EditInput
                  control={form.control}
                  name="name"
                  error={form.formState.errors.name}
                  placeholder="Name"
                  label="Name"
                />

                <EditInput
                  control={form.control}
                  name="email"
                  error={form.formState.errors.email}
                  placeholder="Email"
                  label="Email"
                />

                <EditInput
                  control={form.control}
                  name="phoneNo"
                  error={form.formState.errors.phoneNo}
                  placeholder="Phone Number"
                  label="Phone Number"
                />

                <div className="grid gap-2">
                  <FormLabel>Role</FormLabel>
                  {UserRoles.map((role) => (
                    <div className="items-top flex space-x-2">
                      <Checkbox
                        id={role}
                        value={role}
                        checked={selectedRoles?.includes(role)}
                        onCheckedChange={() => handleCheckBoxChange(role)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={role}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {role?.toUpperCase()}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={loading} loading={loading}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
