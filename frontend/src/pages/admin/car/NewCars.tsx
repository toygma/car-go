import { ChevronLeft, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createOrUpdateCarSchema,
  newUpdateCarSchema,
} from "@/validation/car/car.menu.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import EditInput from "@/components/input/EditInput";
import LocationSearch from "@/components/input/LocationSearch";
import SelectInput from "@/components/input/SelectInput";

import { useMutation } from "@apollo/client";
import { NEW_CAR_MUTATION } from "@/graphql/mutations/car.mutation";
import { toast } from "@/hooks/use-toast";
import {
  carBrand,
  carCategory,
  carDoors,
  carFuelTypes,
  carSeats,
  carStatus,
  carTransmission,
} from "./partials/object-data";
import { toastNotification } from "@/helpers/helpers";
const NewCars = () => {
  const navigate = useNavigate();

  const [images, setImages] = useState<string[]>([]);

  const form = useForm<createOrUpdateCarSchema>({
    resolver: zodResolver(newUpdateCarSchema),
    mode: "onChange",
  });

  const [createCar, { loading, error }] = useMutation(NEW_CAR_MUTATION, {
    onCompleted: () => {
      toast({
        title: "Successfully",
        variant: "success",
      });
      navigate("/admin/cars");
    },
  });

  useEffect(() => {
    if (error) {
      console.log(error.message);
    }
  }, [error]);
  console.log(form.formState.errors);
  const onSubmit = async (data: createOrUpdateCarSchema) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    const carInput = {
      ...data,
      doors: parseInt(data.doors),
      seats: parseInt(data.seats),
      images,
    };

    await createCar({
      variables: { carInput },
    });
  };
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 my-5">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex items-center gap-4">
                  <Link to={"/admin/cars"}>
                    <Button variant="outline" size="icon" className="h-7 w-7">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Back</span>
                    </Button>
                  </Link>
                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Add a New Car
                  </h1>
                  <div className="items-center gap-2 ml-auto">
                    <Button
                      type="submit"
                      loading={loading}
                      disabled={loading}
                      className="w-[120px]"
                    >
                      Create Car
                    </Button>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8 my-5">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Car Details</CardTitle>
                        <CardDescription>
                          Enter the rental car details below
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div>
                            <h2>Name</h2>
                            <EditInput
                              control={form.control}
                              name="name"
                              placeholder="Name"
                              error={form.formState.errors.name}
                            />
                          </div>
                          <div>
                            <h2>Rent Per Day</h2>
                            <EditInput
                              control={form.control}
                              name="rentPerDay"
                              placeholder="RentPerDay"
                              error={form.formState.errors.rentPerDay}
                            />
                          </div>
                          <div>
                            <h2>Description</h2>
                            <EditInput
                              control={form.control}
                              name="description"
                              placeholder="description"
                              multiline
                              error={form.formState.errors.description}
                            />
                          </div>
                          <div>
                            <h2>Address</h2>
                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    <FormControl>
                                      <LocationSearch
                                        onLocationChanged={(value) =>
                                          form.setValue("address", value)
                                        }
                                        value={field.value}
                                      />
                                    </FormControl>
                                  </FormLabel>
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Car Features / Specs</CardTitle>
                        <CardDescription>
                          Enter car features and specifications below
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h2>Brand</h2>
                              <SelectInput
                                control={form.control}
                                name="brand"
                                options={carBrand}
                              />
                            </div>
                            <div>
                              <h2>Transmission</h2>
                              <SelectInput
                                control={form.control}
                                name="transmission"
                                options={carTransmission}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h2>Seats</h2>
                              <SelectInput
                                control={form.control}
                                name="seats"
                                options={carSeats}
                              />
                            </div>
                            <div>
                              <h2>Doors</h2>
                              <SelectInput
                                control={form.control}
                                name="doors"
                                options={carDoors}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h2>Fuel Type</h2>
                              <SelectInput
                                control={form.control}
                                name="fuelType"
                                options={carFuelTypes}
                              />
                            </div>
                            <div>
                              <h2>Category</h2>
                              <SelectInput
                                control={form.control}
                                name="category"
                                options={carCategory}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Further Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h2>Milleage</h2>
                              <EditInput
                                control={form.control}
                                name="milleage"
                                placeholder="Milleage"
                                error={form.formState.errors.milleage}
                              />
                            </div>
                            <div>
                              <h2>Power (CC)</h2>
                              <EditInput
                                control={form.control}
                                name="power"
                                placeholder="Power"
                                error={form.formState.errors.power}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h2>Year</h2>
                              <EditInput
                                control={form.control}
                                name="year"
                                placeholder="Year"
                                error={form.formState.errors.year}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Card>
                      <CardHeader>
                        <CardTitle>Car Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <div>
                              <h2>Status</h2>
                              <SelectInput
                                control={form.control}
                                name="status"
                                options={carStatus}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="overflow-hidden">
                      <CardHeader>
                        <CardTitle>Car Images</CardTitle>
                        <CardDescription>
                          Select car images below to upload
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 gap-2">
                            {/* {images.map((image, index) => (
                          <div className="relative border" key={index}>
                            <img
                              alt="Car Images"
                              className="aspect-square w-full rounded-md object-cover"
                              height="84"
                              src={image}
                              width="84"
                            />
                            <span className="absolute top-0 right-0 p-1 bg-rose-700">
                              <X color="white" className="h-4 w-4" />
                            </span>
                          </div>
                        ))} */}
                            <div className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                              <Upload className="h-4 w-4 text-muted-foreground" />
                              <span className="sr-only">Upload</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewCars;
