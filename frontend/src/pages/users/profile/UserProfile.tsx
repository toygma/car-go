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
  createUpdateProfileSchema,
  updateProfileSchema,
} from "@/validation/profile/profile.menu.schema";
import { useEffect } from "react";
import { useMutation, useReactiveVar } from "@apollo/client";
import { toast } from "@/hooks/use-toast";
import { UPDATE_PROFILE_MUTATION } from "@/graphql/mutations/user.mutations";
import { userVar } from "@/apollo/apolloVars";
const UserProfile = () => {
  const user = useReactiveVar(userVar);

  const [updateUserProfile, { loading }] = useMutation(
    UPDATE_PROFILE_MUTATION,
    {
      onCompleted: () => {
        toast({
          title: "Profile Updated",
          description: "Your Profile Details have been updated",
        });
      },
    }
  );

  const form = useForm<createUpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNo: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      form.setValue("name", user.name);
      form.setValue("email", user.email);
      form.setValue("phoneNo", user.phoneNo);
    }
  }, [user]);

  const submitHandler = async (data: createUpdateProfileSchema) => {
    try {
      const userInput = {
        name: data.name,
        email: data.email,
        phoneNo: data.phoneNo,
      };
      await updateUserProfile({
        variables: { userInput },
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
              name="name"
              placeholder="name"
              error={form.formState.errors.name}
              type="text"
            />
            <EditInput
              control={form.control}
              name="email"
              placeholder="email"
              error={form.formState.errors.email}
              type="email"
            />
            <EditInput
              control={form.control}
              name="phoneNo"
              placeholder="phoneNo"
              error={form.formState.errors.phoneNo}
              type="text"
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

export default UserProfile;
