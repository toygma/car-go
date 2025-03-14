import { ChevronLeft, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
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

import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_CAR_IMAGE,
  UPDATE_CAR_MUTATION,
} from "@/graphql/mutations/car.mutation";
import { toast } from "@/hooks/use-toast";
import {
  carBrand,
  carCategory,
  carDoors,
  carFuelTypes,
  carSeats,
  carStatus,
  carTransmission,
} from "../create/partials/object-data";
import { toastNotification } from "@/helpers/helpers";
import { Input } from "@/components/ui/input";
import { GET_CAR_BY_ID } from "@/graphql/queries/car.queries";
import Loading from "@/components/custom/Loading";
import { Label } from "@/components/ui/label";

const UpdateCar = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const params = useParams();

  const {
    data: carData,
    loading: getDataQuery,
    refetch,
  } = useQuery(GET_CAR_BY_ID, {
    variables: {
      carId: params?.id,
    },
  });

  const car = carData?.getCarById;

  //UPDATE car
  const [updateCar, { loading, error }] = useMutation(UPDATE_CAR_MUTATION, {
    onCompleted: () => {
      refetch();
      toast({
        title: "Successfully",
        variant: "success",
      });
    },
  });
  //DELETE car
  const [deleteCar, { loading: deleteCarLoading }] = useMutation(
    DELETE_CAR_IMAGE,
    {
      onCompleted: () => {
        refetch();
        toast({
          title: "Successfully",
          variant: "success",
        });
      },
    }
  );

  const form = useForm<createOrUpdateCarSchema>({
    resolver: zodResolver(newUpdateCarSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      rentPerDay: 0,
      description: "",
      address: "",
      milleage: 0,
      power: 0,
      year: 0,
      brand: "",
      transmission: "",
      fuelType: "",
      category: "",
      seats: 0,
      doors: 0,
      status: "",
    },
  });

  useEffect(() => {
    if (error) {
      toastNotification(error.message);
    }
    if (car) {
      form.reset({ ...car });
    }
  }, [error, car, form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files && Array.from(e.target.files);
    const maxSize = 2 * 1024 * 1024;
    files?.forEach((file: File) => {
      if (file.size > maxSize) {
        return toast({
          title: "Image cannot be larger than 2 mb",
          variant: "destructive",
        });
      }
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prevArr: any) => [...prevArr, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImagePreviewDelete = (image: string) => {
    const filtered = images.filter((item) => item !== image);
    setImages(filtered);
  };

  const deleteCarImageHandler = async (id: string) => {
    try {
      await deleteCar({
        variables: { carId: car?.id, imageId: id },
      });
    } catch (error) {
      toastNotification(error);
    }
  };

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: createOrUpdateCarSchema) => {
    const carInput = {
      ...data,
      doors: Number(data.doors),
      seats: Number(data.seats),
      images,
    };

    await updateCar({
      variables: { carId: car?.id, carInput },
    });
  };

  if (getDataQuery) {
    return <Loading fullScreen={true} size={60} />;
  }
  return (
    <div className="flex h-full w-full flex-col bg-muted/40 my-5">
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
                    Update Car
                  </h1>
                  <div className="items-center gap-2 ml-auto">
                    <Button
                      type="submit"
                      loading={loading}
                      disabled={loading}
                      className="w-[120px]"
                    >
                      Update Car
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
                                        prevLocation={car?.address}
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
                                updateValue={car.brand}
                              />
                            </div>
                            <div>
                              <h2>Transmission</h2>
                              <SelectInput
                                control={form.control}
                                name="transmission"
                                options={carTransmission}
                                updateValue={car.transmission}
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
                                updateValue={car.seats}
                              />
                            </div>
                            <div>
                              <h2>Doors</h2>
                              <SelectInput
                                control={form.control}
                                name="doors"
                                options={carDoors}
                                updateValue={car.doors}
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
                                updateValue={car.fuelType}
                              />
                            </div>
                            <div>
                              <h2>Category</h2>
                              <SelectInput
                                control={form.control}
                                name="category"
                                options={carCategory}
                                updateValue={car.category}
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
                                updateValue={car.status}
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
                            {images.map((image: any, index) => (
                              <div className="relative border" key={index}>
                                <img
                                  alt="Car Images"
                                  className="aspect-square w-full rounded-md object-cover"
                                  height="84"
                                  src={image}
                                  width="84"
                                />
                                <span
                                  onClick={() =>
                                    handleImagePreviewDelete(image)
                                  }
                                  className="absolute top-0 right-0 p-1 bg-rose-700"
                                >
                                  <X
                                    color="white"
                                    className="h-4 w-4 cursor-pointer"
                                  />
                                </span>
                              </div>
                            ))}
                            <div
                              onClick={() => fileInputRef.current?.click()}
                              className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer"
                            >
                              <Upload className="h-4 w-4 text-muted-foreground" />
                              <span className="sr-only">Upload</span>
                            </div>
                            <Input
                              name="image"
                              multiple
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                              onClick={handleResetFileInput}
                              className="hidden"
                            />
                          </div>
                        </div>

                        {car?.images?.length > 0 && (
                          <div className="mt-2">
                            <Label>Car Images</Label>
                            <div className="grid grid-cols-3 gap-2">
                              {car?.images?.map(
                                (
                                  image: { url: string; public_id: string },
                                  index: string
                                ) => (
                                  <div className="relative border" key={index}>
                                    <img
                                      src={image.url}
                                      alt="car images"
                                      className="aspect-square w-full rounded-md object-cover"
                                    />
                                    <span
                                      onClick={() =>
                                        deleteCarLoading ? (
                                          <>
                                            <Loading size={10} />
                                          </>
                                        ) : (
                                          deleteCarImageHandler(
                                            image?.public_id
                                          )
                                        )
                                      }
                                      className="absolute top-0 right-0 p-1 bg-rose-700"
                                    >
                                      <X
                                        color="white"
                                        className="h-4 w-4 cursor-pointer"
                                      />
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
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

export default UpdateCar;
