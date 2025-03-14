import { useState } from "react";
import {
  CarFront,
  CircleHelp,
  Home,
  ShoppingCart,
  Star,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
export const menuItems = [
  {
    name: "Dashboard",
    url: "/admin/dashboard",
    icon: <Home className="h-5 w-5" />,
  },
  {
    name: "Bookings",
    url: "/admin/bookings",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    name: "Cars",
    url: "/admin/cars",
    icon: <CarFront className="h-5 w-5" />,
  },
  {
    name: "Users",
    url: "/admin/users",
    icon: <User className="h-5 w-5" />,
  },
  {
    name: "Reviews",
    url: "/admin/reviews",
    icon: <Star className="h-5 w-5" />,
  },
  {
    name: "Faqs",
    url: "/admin/faqs",
    icon: <CircleHelp className="h-5 w-5" />,
  },
];
const Sidebar = () => {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);

  const handleMenuItemClick = (menuItemUrl: string) => {
    setActiveMenuItem(menuItemUrl);
  };

  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex-1">
        <nav className="grid items-start px-2 mt-4 text-sm font-medium lg:px-4">
          {menuItems.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              className={
                activeMenuItem?.includes(item.url)
                  ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-primary transition-all hover:text-primary"
                  : `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`
              }
              onClick={() => handleMenuItemClick(item.url)}
            >
              {item?.icon}
              {item?.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
