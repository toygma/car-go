import wave from "/wave.svg";
import { motion } from "framer-motion";
const LeftSection = () => {
  return (
    <>
      <motion.img
        src={wave}
        alt="wave"
        className="w-full h-screen object-cover absolute left-0"
        animate={{ x: ["0%", "-2%", "0%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
};

export default LeftSection;
