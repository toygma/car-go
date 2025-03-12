import { Outlet } from "react-router-dom";
import Header from "@/components/layout/header/Header";
const UserLayout = () => {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div>
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
