import { ChevronLeft, ChevronRight } from "lucide-react";
import { images } from "../data/data";

interface Props {
  current: number;
  prevSlider: () => void;
  nextSlider: () => void;
}

const SliderTwo = ({ current, prevSlider, nextSlider }: Props) => {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Slider Image */}
      <img
        src={images[current].img}
        alt={images[current].title}
        className="object-cover w-full h-full bg-fixed bg-center transition-opacity duration-500 ease-in-out"
      />

      {/* Title and Description */}
      <div className="absolute top-[40%]  lg:-right-48 right-[30%]   transform lg:-translate-x-1/2 lg:-translate-y-1/2 text-center text-white">
        <div>
          <h2 className="mds:text-[48px]  text-xl font-light font-poppins bg-[#FFEAB3] text-[#6A4123]">
            {images[current].title}
          </h2>
          <h4 className="mds:text-[46px] text-xl font-bold font-poppins relative">
            <span className="text-white">MOVE</span>
            <span className="text-[#FFEAB3]"> YOUR </span>
            <span className="text-[#6A4123] ">INVENTORY</span>
            <span className="text-[#6A4123] text-[65px] italic font-light">
              Faster
            </span>
            <span className="bg-[#6A4123] w-[78%] h-[2px] absolute bottom-5 left-0"></span>
          </h4>
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

export default SliderTwo;
