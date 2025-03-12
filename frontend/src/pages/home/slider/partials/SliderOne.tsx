import { ChevronLeft, ChevronRight } from "lucide-react";
import { images } from "../data/data";

interface Props {
  current: number;
  prevSlider: () => void;
  nextSlider: () => void;
}

const SliderOne = ({ current, prevSlider, nextSlider }: Props) => {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden ">
      {/* Slider Image */}
      <img
        src={images[current].img}
        alt={images[current].title}
        className="object-cover w-full h-full bg-fixed bg-center transition-opacity duration-500 ease-in-out "
      />

      {/* Title and Description */}
      <div className="absolute top-1/2  lg:left-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <div>
          <h2 className="xl:text-[72px] md:text-[40px] text-xl font-bold font-poppins ">
            {images[current].title}
          </h2>
          <h4 className="xl:text-[55px] md:text-[40px] text-xl font-light text-[#ACD6F0] font-poppins">
            {images[current].subtitle}
          </h4>
          <p className="xl:text-[35px] md:text-[25px] text-xl  font-poppins">
            {images[current].description}
          </p>
          <p className="xl:text-[70px] lg:text-[50px] md:text-[35px] text-xl font-medium  font-yellow-tail italic text-[#ACD6F0]">
            {images[current].subDescription}
          </p>
          <p className="md:text-[35px] text-xl  font-poppins">
            {images[current].subDescription2}
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div
        className="absolute top-1/2 left-4 w-10 h-10 bg-black/80 text-white cursor-pointer hover:w-12 transition-all duration-300 flex items-center justify-center rounded-full"
        onClick={prevSlider}
      >
        <ChevronLeft size={30} />
      </div>
      <div
        className="absolute top-1/2 right-4 w-10 h-10 bg-black/80 text-white cursor-pointer hover:w-12 transition-all duration-300 flex items-center justify-center rounded-full"
        onClick={nextSlider}
      >
        <ChevronRight size={30} />
      </div>
    </div>
  );
};

export default SliderOne;
