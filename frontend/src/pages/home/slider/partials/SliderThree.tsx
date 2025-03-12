import { ChevronLeft, ChevronRight } from "lucide-react";
import { images } from "../data/data";


interface Props {
    current:number
    prevSlider:()=>void;
    nextSlider:()=>void;
}

const SliderThree = ({current,prevSlider,nextSlider}:Props) => {
  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
    {/* Slider Image */}
    <img
      src={images[current].img}
      alt={images[current].title}
      className="object-cover w-full h-full bg-fixed bg-center transition-opacity duration-500 ease-in-out"
    />

    {/* Title and Description */}
    <div className="absolute lg:top-[90%] top-1/2 lg:left-1/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
      <div>
        <h2 className="md:text-[48px] text-[35px] text-[#B7CD56] font-bold font-poppins ">
          {images[current].title}
        </h2>
        <p className="md:text-[72px] text-[35px]  font-poppins text-white font-bold">
          {images[current].description}
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
  )
}

export default SliderThree