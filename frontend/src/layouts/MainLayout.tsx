import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const pathname = useLocation().pathname;
  const startRoute = pathname.startsWith("/auth");
  return (
    <div className="flex flex-col min-h-screen w-full">
      {!startRoute && <Header />}
      <div className="flex-grow">
        <Outlet />
      </div>
      {!startRoute && <Footer />}
    </div>
  );
};

export default MainLayout;
