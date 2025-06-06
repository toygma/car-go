import Loading from "@/components/custom/Loading";
import { GET_CAR_BY_ID } from "@/graphql/queries/car.queries";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ICar } from "shared/src/interfaces";
import moment from "moment";
import StarRatings from "react-star-ratings";
import NotFound from "@/components/custom/NotFound";
import BookingForm from "./partials/BookingForm";
import CarReviews from "@/components/reviews/CarReviews";
import { Dot } from "lucide-react";
import { CarFaqs } from "./partials/CarFaqs";

const DetailsPage = () => {
  const params = useParams();
  const { data, loading, error, refetch } = useQuery(GET_CAR_BY_ID, {
    variables: {
      carId: params?.id,
      getCarBookedDatesCarId2: params?.id,
      canReviewCarId: params?.id,
    },
    fetchPolicy: "network-only",
  });
  console.log("🚀 ~ DetailsPage ~ data:", data);
  const [active, setActive] = useState<number | null>(null);

  const handlerClickActive = (index: number) => {
    setActive(index);
  };

  if (loading) {
    return <Loading />;
  }
  const car: ICar = data?.getCarById;
  const disabledDates = data?.getCarBookedDates;

  if (error?.graphQLErrors[0]?.extensions?.code === "NOT_FOUND") {
    return <NotFound />;
  }

  return (
    <div className="container mx-auto mt-24 max-w-6xl px-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section - Car Images and Details */}
        <div className="w-full lg:w-3/4">
          <div className="flex items-center gap-4">
            <StarRatings
              rating={Number(car?.ratings?.value) || 0}
              starRatedColor={"orange"}
              numberOfStars={5}
              name="rating"
              starDimension={"22px"}
              starSpacing={"1px"}
            />
            <span className="mt-1 flex items-center justify-center">
              {car?.ratings?.value} <Dot />
              {car?.ratings?.count} reviews
            </span>
            <h2 className="text-xl font-semibold text-gray-400 pt-[3px]">
              {moment(Number(car?.createdAt)).format("ll")}
            </h2>
          </div>
          {/* Main Image */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <img
              src={
                active !== null
                  ? (car?.images[active]?.url as any)
                  : car?.images[0]?.url
              }
              alt="banner"
              className="object-cover w-full h-96 rounded-lg transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="mt-6 flex items-center gap-4  pb-4">
            {car?.images?.length > 0 &&
              car.images.map((image, index) => (
                <img
                  onClick={() => handlerClickActive(index)}
                  key={index}
                  src={image?.url}
                  alt="banner"
                  className={`object-cover w-20 h-20 cursor-pointer rounded-lg transition-all duration-300 ${
                    active === index
                      ? "border-4 border-blue-500 transform scale-110"
                      : "border-2 border-gray-200 hover:border-blue-300"
                  }`}
                />
              ))}
          </div>

          {/* Car Information */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {car?.name} ({car?.year}) - Status({car?.status})
            </h1>
            <div className="space-y-6">
              {/* Car Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoBox label="Brand Name" value={car?.brand} />
                <InfoBox label="Total Doors" value={car?.doors} />
                <InfoBox label="Car Type" value={car?.category} />
                <InfoBox
                  label="Power"
                  value={car?.power ? car?.power : "none"}
                />
                <InfoBox label="Fuel" value={car?.fuelType} />
                <InfoBox label="Gear" value={car?.transmission} />
                <InfoBox label="Total Seats" value={car?.seats} />
                <InfoBox label="Milleage" value={car?.milleage} />
                <InfoBox label="Year" value={car?.year} />
              </div>
              {/* Additional Information */}
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-3">
                  Address & Description
                </h2>
                <ul className=" text-gray-600">
                  <li>{car?.address}</li>
                  <hr />
                  <li>{car?.description}</li>
                </ul>
              </div>
            </div>
          </div>
          <br />
          {/* FAQ Section */}
          <CarFaqs faqs={data?.getAllFaqs} />

          {/* Reviews Section */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h2>
            <div className="space-y-4">
              <CarReviews
                carId={car?.id}
                reviews={car?.reviews}
                canReview={data?.canReview}
                refetchCar={refetch}
              />
            </div>
          </div>
        </div>
        {/* Right Section - Booking or Additional Info */}
        <div className="w-full lg:w-1/3">
          <BookingForm
            carId={car?.id}
            rentPerDay={car?.rentPerDay}
            disableDates={disabledDates}
          />
        </div>
      </div>
    </div>
  );
};

const InfoBox = ({ label, value }: { label: string; value: any }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold text-gray-800">{value}</p>
  </div>
);

export default DetailsPage;
