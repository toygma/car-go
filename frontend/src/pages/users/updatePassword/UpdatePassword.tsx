import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditInput from "@/components/input/EditInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  createUpdatePasswordSchema,
  updatePasswordSchema,
} from "@/validation/profile/updateProfileSchema";
import { useMutation } from "@apollo/client";
import { toast } from "@/hooks/use-toast";
import { UPDATE_PASSWORD_MUTATION } from "@/graphql/mutations/user.mutations";
const UpdatePassword = () => {
  const [updatePassword, { loading }] = useMutation(UPDATE_PASSWORD_MUTATION, {
    onCompleted: () => {
      toast({
        title: "Password Updated",
        description: "Your Profile Details have been updated",
      });
    },
  });

  const form = useForm<createUpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
    mode: "onChange",
  });

  const submitHandler = async (data: createUpdatePasswordSchema) => {
    try {
      const passwords = {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };
      await updatePassword({
        variables:  passwords ,
      });
    } catch (error: any) {
      toast({
        title: "Something went wrong",
        description: error.message,
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Enter your details to update profile</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="flex flex-col gap-4 w-full"
          >
            <EditInput
              control={form.control}
              name="oldPassword"
              placeholder="oldPassword"
              error={form.formState.errors.oldPassword}
              type="password"
            />
            <EditInput
              control={form.control}
              name="newPassword"
              placeholder="newPassword"
              error={form.formState.errors.newPassword}
              type="password"
            />
            <EditInput
              control={form.control}
              name="confirmPassword"
              placeholder="confirmPassword"
              error={form.formState.errors.confirmPassword}
              type="password"
            />
            <div className="flex items-center justify-between">
              <Button variant="outline">Cancel</Button>
              <Button type="submit" loading={loading} disabled={loading}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UpdatePassword;
