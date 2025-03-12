import { motion } from "framer-motion";
import greenCar from "/green-car.png";

const RightSection = () => {
  return (
    <>
      <motion.img
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 3,
          ease: "easeOut",
          staggerChildren: 0.01,
          delay: 0.01,
        }}
        src={greenCar}
        alt="green-car"
        title="green_car"
        className="object-cover absolute 2xl:top-1/7 top-1/3 left-1/2"
      />
    </>
  );
};

export default RightSection;
