import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { menuItems } from "./Sidebar";

export function MobileSideBar() {
  const location = useLocation();
  const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);
  const [open, setOpen] = useState<boolean>(false);

  const handleMenuItemClick = (menuItemUrl: string) => {
    setActiveMenuItem(menuItemUrl);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          <FaBars size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-center">Admin Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-12">
          {menuItems.map((item) => (
            <Link
              key={item.url}
              to={item.url}
              className={
                activeMenuItem?.includes(item.url)
                  ? "flex items-center gap-3 rounded-lg px-3 py-2 bg-muted text-primary transition-all hover:text-primary"
                  : `flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary`
              }
              onClick={() => {
                handleMenuItemClick(item.url);
                setOpen(false);
              }}
            >
              {item?.icon}
              {item?.name}
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
