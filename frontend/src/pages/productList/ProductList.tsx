import { GET_ALL_CARS } from "@/graphql/queries/car.queries";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CarFront, Dot } from "lucide-react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { Button } from "@/components/ui/button";
import Loading from "@/components/custom/Loading";
import { ICar } from "shared/src/interfaces";
const ProductList = () => {
  const [searchParams] = useSearchParams();
  const variables = { searchParams };
  const { data, loading } = useQuery(GET_ALL_CARS, { variables });

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="mt-32 container mx-auto min-h-screen">
      <div className="grid grid-cols-2">
        {data?.getAllCars?.car?.map((car: ICar) => (
          <Card
            key={car?.id}
            className="w-full flex md:flex-row flex-col md:h-[250px] h-full hover:scale-105 transition-all duration-300"
          >
            <Link to={`/car/details/${car?.id}`} className="cursor-pointer">
              {car?.images[1]?.url ? (
                <img
                  src={car?.images[1]?.url}
                  className="lg:w-[300px] xl:w-full w-full  h-[250px] object-cover rounded-md rounded-r-none"
                  alt="car-audi"
                />
              ) : (
                <CarFront color="#e3e3e3" className="w-[300px] h-[250px]" />
              )}
            </Link>
            <div>
              <CardHeader>
                <CardTitle className="text-2xl">
                  {car?.name}({car?.year})
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    <Dot />
                    {car?.category}
                  </Badge>
                  <Badge variant="outline">
                    <Dot />
                    {car?.fuelType}
                  </Badge>
                  <Badge variant="outline">
                    <Dot />
                    {car?.transmission}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex items-center mb-4">
                <StarRatings
                  rating={car?.ratings?.value}
                  starRatedColor={"orange"}
                  numberOfStars={5}
                  name="rating"
                  starDimension={"22px"}
                  starSpacing={"1px"}
                />
                <span className="pt-1">{car?.ratings?.value}</span>
                <Dot />{" "}
                <span className="font-bold underline pt-1">
                  {car?.ratings?.count} Reviews
                </span>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div>
                  <span className="font-bold text-2xl">{car?.rentPerDay}$</span>
                  <p className="text-gray-400">Rent Per Day</p>
                </div>
                <Link to={`/car/details/${car?.id}`}>
                  <Button variant={"default"} className="cursor-pointer">
                    Book Now
                  </Button>
                </Link>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
