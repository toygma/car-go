import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { updateSearchParams } from "@/helpers/helpers";
import {
  CarBrand,
  CarCategories,
  CarTransmissions,
} from "shared/src/interfaces";

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  let [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get("category"),
    brand: searchParams.get("brand"),
    transmission: searchParams.get("transmission"),
  });
  const navigate = useNavigate();

  //filters
  const handleCheckBoxChange = (type: string, value: string) => {
    setFilters((prevState: any) => ({
      ...prevState,
      [type]: prevState[type] === value ? null : value,
    }));
  };

  useEffect(() => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        updatedSearchParams.set(key, value);
      } else {
        updatedSearchParams.delete(key);
      }
    });

    const newPathname = `${
      window.location.pathname
    }?${updatedSearchParams.toString()}`;
    navigate(newPathname);
  }, [filters, navigate, searchParams]);

  //search
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const search = searchParams.get("query");

    if (searchQuery.trim()) {
      if (search) {
        searchParams = updateSearchParams(searchParams, "query", searchQuery);
      } else {
        searchParams.set("query", searchQuery);
      }
    } else {
      searchParams.delete("query");
    }

    const pathname = `${window.location.pathname}?${searchParams.toString()}`;

    navigate(pathname);
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-start bg-muted/25">
          <div className="grid gap-0.5">
            <div className="text-sm text-muted-foreground">
              <div className="filter-section my-8">
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-bold mt-4 my-2">Type keyword</h2>
                  <div className="relative ml-auto flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      type="search"
                      placeholder="Search..."
                      className="w-full rounded-lg bg-background pl-8"
                    />
                  </div>
                </form>
              </div>

              <div className="filter-section my-8">
                <h2 className="text-xl font-bold mt-4 my-3">Car Type</h2>
                {CarCategories?.map((category) => (
                  <div
                    key={category}
                    className="flex items-center space-x-2 my-2"
                  >
                    <Checkbox
                      onCheckedChange={() =>
                        handleCheckBoxChange("category", category)
                      }
                      id="category"
                      checked={filters.category === category}
                      name="category"
                      value={category}
                    />
                    <label
                      htmlFor="carType"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>

              <div className="filter-section my-8">
                <h2 className="text-xl font-bold mt-4 my-3">Select Brand</h2>
                {CarBrand?.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2 my-2">
                    <Checkbox
                      onCheckedChange={() =>
                        handleCheckBoxChange("brand", brand)
                      }
                      checked={filters.brand === brand}
                      id="brand"
                      name="brand"
                      value={brand}
                    />
                    <label
                      htmlFor="carBrand"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>

              <div className="filter-section my-8">
                <h2 className="text-xl font-bold mt-4 my-3">Transmission</h2>
                {CarTransmissions?.map((transmission) => (
                  <div
                    key={transmission}
                    className="flex items-center space-x-2 my-2"
                  >
                    <Checkbox
                      id="transmission"
                      name="transmission"
                      value={transmission}
                      onCheckedChange={() =>
                        handleCheckBoxChange("transmission", transmission)
                      }
                      checked={filters.transmission === transmission}
                    />
                    <label
                      htmlFor="carTransmission"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {transmission}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Sidebar;
