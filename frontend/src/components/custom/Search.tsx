import { useForm } from "react-hook-form";
import SelectInput from "../input/SelectInput";
import {
  createSearchSchema,
  searchMenuSchema,
} from "@/validation/searchMenu/search.menu.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "../ui/button";
const SearchMenu = () => {
  const form = useForm<createSearchSchema>({
    resolver: zodResolver(searchMenuSchema),
    defaultValues: {
      year: "",
      category: "",
      doors: "",
      fuelType: "",
      name: "",
      power: "",
      seats: "",
      transmission: "",
    },
  });
  const cityOptions = [
    { value: "istanbul", label: "İstanbul" },
    { value: "ankara", label: "Ankara" },
    { value: "izmir", label: "İzmir" },
  ];

  const onSubmit = (data: createSearchSchema) => {};

  return (
    <div className="bg-white shadow-xl rounded-md md:w-[500px] w-full absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="grid md:grid-cols-4 grid-cols-3 gap-4 py-2 px-4">
            <SelectInput
              control={form.control}
              label="Year"
              name="year"
              options={cityOptions}
              error={form.formState.errors.year}
            />
            <SelectInput
              control={form.control}
              label="Category"
              name="category"
              options={cityOptions}
              error={form.formState.errors.category}
            />
            <SelectInput
              control={form.control}
              label="Doors"
              name="doors"
              options={cityOptions}
              error={form.formState.errors.doors}
            />
            <SelectInput
              control={form.control}
              label="FuelType"
              name="fuelType"
              options={cityOptions}
              error={form.formState.errors.fuelType}
            />{" "}
            <SelectInput
              control={form.control}
              label="Name"
              name="name"
              options={cityOptions}
              error={form.formState.errors.name}
            />{" "}
            <SelectInput
              control={form.control}
              label="Power"
              name="power"
              options={cityOptions}
              error={form.formState.errors.power}
            />{" "}
            <SelectInput
              control={form.control}
              label="Seats"
              name="seats"
              options={cityOptions}
              error={form.formState.errors.seats}
            />{" "}
            <SelectInput
              control={form.control}
              label="Transmission"
              name="transmission"
              options={cityOptions}
              error={form.formState.errors.transmission}
            />
          </div>
          <div className="w-full px-4 py-2">
            <Button type="submit" className="w-full cursor-pointer">
              Search
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SearchMenu;
