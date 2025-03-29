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
import { Button } from "../ui/button";
import { ICar } from "shared/src/interfaces";
import StarRatings from "react-star-ratings";

interface ICarProps {
  cars: ICar;
}

const FeaturesCards = ({ cars }: ICarProps) => {
  const {
    category,
    fuelType,
    id,
    images,
    name,
    ratings,
    rentPerDay,
    transmission,
    year,
  } = cars;
  return (
    <Card className="w-full flex md:flex-row flex-col md:h-[250px] h-full hover:scale-105 transition-all duration-300">
      <Link to={`/car/details/${id}`} className="cursor-pointer">
        {images[1]?.url ? (
          <img
            src={images[1]?.url}
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
            {name}({year})
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              <Dot />
              {category}
            </Badge>
            <Badge variant="outline">
              <Dot />
              {fuelType}
            </Badge>
            <Badge variant="outline">
              <Dot />
              {transmission}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex items-center mb-4">
          <StarRatings
            rating={ratings?.value}
            starRatedColor={"orange"}
            numberOfStars={5}
            name="rating"
            starDimension={"22px"}
            starSpacing={"1px"}
          />
          <span className="pt-1">{ratings?.value}</span>
          <Dot />{" "}
          <span className="font-bold underline pt-1">
            {ratings?.count} Reviews
          </span>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div>
            <span className="font-bold text-2xl">{rentPerDay}$</span>
            <p className="text-gray-400">Rent Per Day</p>
          </div>
          <Link to={`/car/details/${id}`}>
            <Button variant={"default"} className="cursor-pointer">
              Book Now
            </Button>
          </Link>
        </CardFooter>
      </div>
    </Card>
  );
};

export default FeaturesCards;
