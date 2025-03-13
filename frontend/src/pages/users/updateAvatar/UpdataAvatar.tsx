import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  createUpdateAvatarSchema,
  UpdateAvatarSchema,
} from "@/validation/profile/profile.menu.schema";
import { useMutation, useReactiveVar } from "@apollo/client";
import { toast } from "@/hooks/use-toast";
import { UPDATE_AVATAR_MUTATION } from "@/graphql/mutations/user.mutations";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userVar } from "@/apollo/apolloVars";
import { getUserName } from "@/helpers/helpers";
import ImagesInput from "@/components/input/ImagesInput";
import { useState } from "react";
const UpdateAvatar = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const user = useReactiveVar(userVar);

  const [updateAvatar, { loading }] = useMutation(UPDATE_AVATAR_MUTATION, {
    onCompleted: () => {
      toast({
        title: "Avatar Updated",
        description: "Your Profile Details have been updated",
      });
    },
  });

  const form = useForm<createUpdateAvatarSchema>({
    resolver: zodResolver(UpdateAvatarSchema),
    defaultValues: {
      avatar: undefined,
    },
    mode: "onChange",
  });

  const submitHandler = async () => {
    try {
      await updateAvatar({
        variables: { avatar },
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
            <div className="grid gap-3 w-full items-center max-w-sm">
              <Label htmlFor="avatar">Avatar</Label>
              <div className="flex items-center">
                <Avatar className="w-12 h-12 mr-4">
                  <AvatarImage src={!avatar ? user?.avatar?.url : avatar} />
                  <AvatarFallback>
                    {getUserName(user?.name.toUpperCase())}
                  </AvatarFallback>
                </Avatar>
                <ImagesInput
                  control={form.control}
                  name="avatar"
                  error={form.formState.errors.avatar}
                  setPreview={setAvatar}
                />
              </div>
            </div>
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

export default UpdateAvatar;
