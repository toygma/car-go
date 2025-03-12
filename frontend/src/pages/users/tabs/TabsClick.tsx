import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpdatePassword from "../updatePassword/UpdatePassword";
import UserProfile from "../profile/UserProfile";
import UpdateAvatar from "../updateAvatar/UpdataAvatar";
const TabsClick = () => {
  return (
    <section>
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Profile Settings
        </h1>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 ">
            <TabsTrigger
              value="profile"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 data-[state=active]:bg-gray-300 cursor-pointer"
            >
              Update Profile
            </TabsTrigger>
            <TabsTrigger
              value="update-password"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 data-[state=active]:bg-gray-300 cursor-pointer"
            >
              Update Password
            </TabsTrigger>
            <TabsTrigger
              value="update-avatar"
              className=" text-sm font-medium text-gray-600 hover:text-gray-900 data-[state=active]:bg-gray-300 cursor-pointer"
            >
              Update Avatar
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="mt-6">
            <UserProfile />
          </TabsContent>
          <TabsContent value="update-password" className="mt-6">
            <UpdatePassword />
          </TabsContent>
          <TabsContent value="update-avatar" className="mt-6">
            <UpdateAvatar />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TabsClick;
