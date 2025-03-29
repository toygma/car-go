import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";
import { useReactiveVar, useSubscription } from "@apollo/client";
import { NEW_BOOKING_SUBSCRIPTION } from "./graphql/subscrition/booking.subscription";
import { userVar } from "./apollo/apolloVars";
import { useEffect } from "react";
import { toast } from "./hooks/use-toast";
const App = () => {
  const { data, error } = useSubscription(NEW_BOOKING_SUBSCRIPTION);

  const user = useReactiveVar(userVar);

  useEffect(() => {
    if (data && user?.role?.includes("admin")) {
      toast({
        title: `New booking worth: $${data?.newBookingAlert?.amount}`,
        description: data?.newBookingAlert?.car,
      });
    }
  }, [data, user]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
