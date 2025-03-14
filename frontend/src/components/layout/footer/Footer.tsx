import { ChevronRight } from "lucide-react";
import { FaCar } from "react-icons/fa";
const menuItems = [
  "Home",
  "Services",
  "About us",
  "Inventory",
  "Parts Shop",
  "Contact us",
];

const contactInfo = [
  { label: "Fairview Ave, El Monte, CA 91732", value: "" },
  { label: "support@example.com", value: "" },
  { label: "Phone:", value: "+1 755 302 8549" },
  { label: "Take a test drive", value: "" },
];
const Footer = () => {
  return (
    <div className="relative mt-44">
      <div
        className="lg:h-[50vh] md:h-[70vh] h-full w-full absolute -z-10 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/footer-bg-min.jpg")',
          clipPath: "polygon(0 0, 90% 14%, 100% 0, 100% 100%, 0 100%, 0% 50%)",
        }}
      />
      <div className="relative z-[999] text-white flex justify-center items-center h-full">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 max-w-7xl mx-auto gap-8 mt-32">
          <div className="flex flex-col items-center md:items-start gap-4 col-span-1 ">
            <h1 className="flex items-center gap-2 text-4xl font-semibold">
              <FaCar className="text-blue-700 text-[52px]" />
              Car
              <span className="text-blue-400 font-bold underline underline-offset-2">
                Go
              </span>
            </h1>
            <p className="max-w-xs text-center md:text-lef">
              Ceipisicing elit sed do eiusmod tempor laboe dolore magna aliqa Ut
              enim ad minim veniam quis nostrud exercitation ullam co laboris
              nis aliquip comsecd sed ipsum.
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-6  items-center md:items-start">
            <h1 className="font-light text-gray-100 font-poppins text-2xl">
              Dealer Information
            </h1>
            <p className="text-gray-400 text-center md:text-lef">
              <strong className="text-white">Sales Hours</strong>
              <br />
              Mon - Fri: 09:00 am to 06:00 pm <br /> Sat: 10:00am to 05:00 pm
            </p>
          </div>
          <div className=" mt-4 flex flex-col gap-6  items-center md:items-start">
            <h1 className="font-light text-gray-100 font-poppins text-2xl flex items-center gap-4">
              About{" "}
            </h1>
            <div className="flex flex-col gap-2">
              {menuItems.map((item, index) => (
                <span
                  key={index}
                  className="text-gray-400 flex items-center gap-2 hover:text-orange-400 transition-all duration-300"
                >
                  <ChevronRight />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className=" mt-4 flex flex-col gap-6  items-center md:items-start text-center md:text-left">
            <h1 className="font-light text-gray-100 font-poppins text-2xl flex items-center gap-4">
              Get In Touch
            </h1>
            <div className="flex flex-col gap-2">
              {contactInfo.map((info, index) => (
                <span key={index} className={`text-gray-400`}>
                  {info.label}
                  {info.value && (
                    <span className="text-gray-300">{info.value}</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <img
        src="/footer-decor-image-min.png"
        alt="Footer Decoration"
        className="absolute -top-32"
      />
    </div>
  );
};

export default Footer;
