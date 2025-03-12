import { isAuthenticatedVar, isLoadingVar, userVar } from "@/apollo/apolloVars";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CURRENT_USER } from "@/graphql/queries/user.queries";
import { getUserName } from "@/helpers/helpers";
import { useQuery } from "@apollo/client";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const MobileMenu = ({logout}:any) => {
  const { loading, data } = useQuery(CURRENT_USER, {
    onCompleted: (data) => {
      userVar(data?.me);
      isAuthenticatedVar(true);
      isLoadingVar(false);
    },
    onError: () => {
      userVar(null);
      isAuthenticatedVar(false);
      isLoadingVar(false);
    },
  });

  const currentUser = data?.me;

  const logoutHandler = () => {
    logout();
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          <FaBars size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-6 w-80 bg-white dark:bg-gray-900 shadow-lg rounded-lg ">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-lg font-semibold text-center">
            {currentUser ? "Profile Menu":"Log in now"}
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-center gap-4">
          {!currentUser && !loading ? (
            <Link to="/auth">
              <Button className="cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">
                Login
              </Button>
            </Link>
          ) : (
            <div className="relative flex flex-col items-center gap-4 w-full">
              {/* Avatar Menu */}
              <Avatar className="cursor-pointer w-16 h-16 border-2 border-blue-500 shadow-md">
                <AvatarImage
                  src={currentUser?.avatar?.url}
                  className="rounded-full"
                />
                <AvatarFallback className="uppercase text-lg font-bold bg-blue-500 text-white flex items-center justify-center">
                  {getUserName(currentUser?.name) || "?"}
                </AvatarFallback>
              </Avatar>
              <h1 className="uppercase text-xl font-semibold text-gray-700 dark:text-gray-300">
                Hello, {currentUser?.name}
              </h1>
              <ul className="flex flex-col gap-2 text-lg text-gray-600 dark:text-gray-300 w-full text-center">
                <li className="hover:text-blue-500 cursor-pointer transition">
                  Profile
                </li>
                <li className="hover:text-blue-500 cursor-pointer transition">
                  Dashboard
                </li>
                <li className="hover:text-blue-500 cursor-pointer transition">
                  My Bookings
                </li>
              </ul>
              <Button onClick={logoutHandler} className="cursor-pointer w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md transition duration-300">
                Logout
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
