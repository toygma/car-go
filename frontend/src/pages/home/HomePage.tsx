import { useQuery } from "@apollo/client";
import SectionRepair from "./partials/sectionRepair/SectionRepair";
import FeaturesCards from "@/components/cards/FeaturesCards";
import Title from "@/shared/Title";
import { GET_ALL_CARS } from "@/graphql/queries/car.queries";
import { ICar } from "shared";
import Loading from "@/components/custom/Loading";
import Sidebar from "./partials/sidebar/Sidebar";
import { useSearchParams } from "react-router-dom";
import Pagination from "@/components/custom/Pagination";
import { useEffect, useState } from "react";
import { toastNotification } from "@/helpers/helpers";
import SectionDetails from "./partials/sectionDetails/SectionDetails";
import { images } from "./slider/data/data";
import SliderOne from "./slider/partials/SliderOne";
import SliderTwo from "./slider/partials/SliderTwo";
import SliderThree from "./slider/partials/SliderThree";
import HeroSub from "./partials/heroSub/HeroSub";
import SectionInformation from "./partials/sectionInformation/SectionInformation";
import SectionAutlines from "./partials/sectionAutlines/SectionAutlines";

const HomePage = () => {
  const [current, setCurrent] = useState(0);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const transmission = searchParams.get("transmission");
  const page = parseInt(searchParams.get("page") || "1", 10);

  //slider
  const nextSlider = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlider = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const filters = {
    status: "Draft",
    ...(category && { category }),
    ...(brand && { brand }),
    ...(transmission && { transmission }),
  };

  const variables = {
    page,
    filters,
    query,
  };

  const { data, loading, error } = useQuery(GET_ALL_CARS, { variables });
  console.log("data:", data);
  
  useEffect(() => {
    if (error) {
      toastNotification(error);
    }
  }, [error]);

  if (loading) {
    return <Loading fullScreen={true} size={60} />;
  }

  return (
    <div className="w-full overflow-hidden">
      {/* HERO */}
      {current === 0 && (
        <SliderOne
          current={current}
          prevSlider={prevSlider}
          nextSlider={nextSlider}
        />
      )}
      {current === 1 && (
        <SliderTwo
          current={current}
          prevSlider={prevSlider}
          nextSlider={nextSlider}
        />
      )}
      {current === 2 && (
        <SliderThree
          current={current}
          prevSlider={prevSlider}
          nextSlider={nextSlider}
        />
      )}
      {/* HERO SUB */}
      <div>
        <HeroSub />
      </div>
      {/* SECTION DETAILS */}
      <div className="max-w-6xl mx-auto">
        <SectionDetails />
      </div>
      {/* SECTION INFORMATION */}
      <div className="mt-24 ">
        <SectionInformation />
      </div>
      {/* SECTION REPAIR */}
      <div className="max-w-6xl mx-auto">
        <SectionRepair />
      </div>
      {/* SECTION AUTLINES */}
      <div className="max-w-6xl mx-auto min-h-screen">
        <SectionAutlines />
      </div>
      {/* SECTION CARD */}
      <div className="container mx-auto min-h-screen mb-44">
        <Title title="Car's" />
        <div className="flex md:flex-row flex-col gap-4 ">
          <div className="md:w-1/4 w-full">
            <Sidebar />
          </div>
          <div className="grid xl:grid-cols-2 grid-cols-1 gap-4 w-full">
            {data?.getAllCars?.car?.map((cars: ICar) => (
              <FeaturesCards cars={cars} key={cars?.id} />
            ))}
          </div>
        </div>
        {data?.getAllCars?.pagination?.totalCount >
          data?.getAllCars?.pagination?.resPerPage && (
          <Pagination
            totalCount={data?.getAllCars?.pagination?.totalCount}
            resPerPage={data?.getAllCars?.pagination?.resPerPage}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
