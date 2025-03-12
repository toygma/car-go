import Title from "@/shared/Title";
import { Phone } from "lucide-react";

const SectionAutlines = () => {
  return (
    <main>
      <div className="flex lg:flex-row flex-col">
        <div className="flex-1 relative p-4">
          <Title title="Easy Auto Finance Facilities" className="text-[4rem]" />
          <div className="flex flex-col gap-4 font-poppins text-gray-700 font-light p-12">
            <p>
              They’re a blessed give. Lesser place their fly years can’t him
              moving. Be dry sixth living sixth appear fruit. Be. Give day
              gathered years sixth. Made she’d firmament creepeth gathered also
              thing under. Wherein lesser, doesn’t likeness, she’d second
              evening. It. Stars i multiply gathered third created meat.
            </p>
            <p>
              Fowl male air have abundantly was, dominion saw for form set
              divided years, his image. Lights tree of a. Were great.
            </p>
            <h1 className="text-2xl font-bold text-blue-400">
              Book your free Auto Inspection
            </h1>
            <p>
              Without let us forth day good which very abundantly beginning
              winged under upon don’t, evening creepeth called sea kind face
              him.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <Phone size={24} />
                <p>Call Us For Booking</p>
              </div>
              <div className="flex items-center gap-4 bg-gray-100 p-2">
                <p>+90 (535) 000 00 99</p>
              </div>
            </div>
          </div>
          <div className="absolute left-0 bottom-0 w-2/3 h-1/2 border-l-8 border-b-8 border-gray-200"></div>
        </div>
        <div className="flex-1">
          <div className="grid md:grid-cols-2 grid-cols-1 md:mb-0 mb-12 h-full w-full gap-8">
            <div className="relative h-[35vh] group image-d">
              <div className="relative">
                <img
                  src="/network.svg"
                  alt=""
                  className="object-cover h-24 w-24 absolute top-1/2 left-1/2 -translate-x-1/2 mt-8"
                />
                <img
                  src="/bg-tabs-min.jpg"
                  alt="bg-accent"
                  className="absolute opacity-10 w-full object-cover inset-0 clip-path-image transition-all duration-300"
                />
              </div>
              <div className="clip-path-custom bg-[#22ABC3] hover:opacity-30 transition-all duration-300 absolute bottom-0 w-full"></div>
              <h1 className="text-xl font-bold text-white absolute bottom-12 left-14  group-hover:text-black ">
                Easy Auto Finance Facilities
              </h1>
            </div>
            <div className="relative h-[35vh] group image-d">
              <div className="relative">
                <img
                  src="/network-1.svg"
                  alt=""
                  className="object-cover h-24 w-24 absolute top-1/2 left-1/2 -translate-x-1/2 mt-8"
                />
                <img
                  src="/bg-tabs-min.jpg"
                  alt="bg-accent"
                  className="absolute opacity-10 w-full object-cover inset-0 clip-path-image transition-all duration-300"
                />
              </div>
              <div className="clip-path-custom bg-[#22ABC3] hover:opacity-30 transition-all duration-300 absolute bottom-0 w-full"></div>
              <h1 className="text-xl font-bold text-white absolute bottom-12 left-14  group-hover:text-black ">
                Latest Equipments Workshop
              </h1>
            </div>
            <div className="relative h-[35vh] group image-d">
              <div className="relative">
                <img
                  src="/network-2.svg"
                  alt=""
                  className="object-cover h-24 w-24 absolute top-1/2 left-1/2 -translate-x-1/2 mt-8"
                />
                <img
                  src="/bg-tabs-min.jpg"
                  alt="bg-accent"
                  className="absolute opacity-10 w-full object-cover inset-0 clip-path-image transition-all duration-300"
                />
              </div>
              <div className="clip-path-custom bg-[#22ABC3] hover:opacity-30 transition-all duration-300 absolute bottom-0 w-full"></div>
              <h1 className="text-xl font-bold text-white absolute bottom-12 left-14   group-hover:text-black ">
                We’re Trusted By Thousands
              </h1>
            </div>
            <div className="relative h-[35vh] group image-d">
              <div className="relative">
                <img
                  src="/network-3.svg"
                  alt=""
                  className="object-cover h-24 w-24 absolute top-1/2 left-1/2 -translate-x-1/2 mt-8"
                />
                <img
                  src="/bg-tabs-min.jpg"
                  alt="bg-accent"
                  className="absolute opacity-10 w-full object-cover inset-0 clip-path-image transition-all duration-300"
                />
              </div>
              <div className="clip-path-custom bg-[#22ABC3] hover:opacity-30 transition-all duration-300 absolute bottom-0 w-full"></div>
              <h1 className="text-xl font-bold text-white absolute bottom-12 left-14 w-full group-hover:text-black ">
                Vehicle Service & Maintainance
              </h1>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SectionAutlines;
