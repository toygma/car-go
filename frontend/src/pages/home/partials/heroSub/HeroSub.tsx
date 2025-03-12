import { Button } from "@/components/ui/button";

const HeroSub = () => {
  return (
    <div className="bg-[#F0F0F0] w-full lg:h-[10vh] h-full lg:pb-0 pb-4 drop-shadow-2xl relative">
      <div className="bg-white  w-full h-1 absolute top-0 drop-shadow-xl"></div>
      <div className="flex items-center h-full  justify-between md:max-w-7xl w-full md:mx-auto lg:flex-row flex-col">
        <div className="flex items-center justify-center w-full text-center md:text-left">
          <h1 className="xl:text-[30px] text-xl font-poppins font-light text-gray-600">
            Discover a website for car dealers that converts visitors to{" "}
            <span className="text-red-600 font-yellow-tail italic text-[40px]">
              customers
            </span>
          </h1>
        </div>
        <Button className="bg-red-600 mt-2 cursor-pointer">
          Schedule a test drive
        </Button>
      </div>
      <div className="bg-white  w-full h-1 absolute bottom-0 drop-shadow-xl"></div>
    </div>
  );
};

export default HeroSub;
