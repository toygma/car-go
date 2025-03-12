import { useState } from "react";
import car1 from "/repair/car1.jpg";
import car2 from "/repair/car2.jpg";
import car3 from "/repair/car3.jpg";
import { motion } from "framer-motion";
import { Expand, Link, X } from "lucide-react";

const data = [
  {
    id: 1,
    title: "FACTORY READY FOR TRACK DAY",
    description:
      "Sea veniam lucilius neglegentur ad, an per sumo volum voluptatibus. Qui cu everti repudiare. Eam ut cibo nobis aperiam, elit qualisque at cum. Possit antiopam id est.",
    img: car1,
  },
  {
    id: 2,
    title: "SPORT UTILITY FOR THE FAMILY",
    description:
      "Cum ut tractatos imperdiet, no tamquam facilisi qui. Eum tibique consectetuer in, an legimus referrentur vis, vocent deseruisse ex mel. Sed te idque graecis.",
    img: car2,
  },
  {
    id: 3,
    title: "MAKE AN EXECUTIVE STATEMENT",
    description:
      "Te inermis cotidieque cum, sed ea utroque atomorum sadipscing. Qui id oratio everti scaevola, vim ea augue ponderum vituperatoribus.",
    img: car3,
  },
];

const SectionDetails = () => {
  const [mouseEnter, setMouseEnter] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="mt-42 p-4">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
        {data.map((post) => (
          <div
            key={post.id}
            className="flex flex-col gap-2"
            onMouseOver={() => setMouseEnter(post.id)}
            onMouseLeave={() => setMouseEnter(null)}
          >
            {/* Image Flip Effect */}
            <motion.div
              className="w-full h-[250px] rounded-md relative"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: mouseEnter === post.id ? 180 : 0 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src={post.img}
                alt={post.title}
                className="w-full h-full rounded-md absolute"
                style={{ backfaceVisibility: "hidden" }}
              />

              {/* Hover Overlay */}
              <div
                className="w-full h-full rounded-md bg-red-600 flex flex-col items-center justify-center absolute"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                }}
              >
                <h1 className="font-poppins text-[40px] text-white font-light">
                  Race Ready
                </h1>
                <div className="flex items-center gap-4">
                  <span className="border-2 cursor-pointer border-white p-2 rounded-full hover:bg-white group">
                    <Link className="text-white group-hover:text-black" />
                  </span>
                  <span
                    className="border-2 cursor-pointer border-white p-2 rounded-full hover:bg-white group"
                    onClick={() => setSelectedImage(post.img)}
                  >
                    <Expand className="text-white group-hover:text-black" />
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <h1 className="text-[#C7081B] font-bold text-xl">{post.title}</h1>
            <p className="text-gray-600">{post.description.slice(0, 200)}...</p>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className="relative p-2 bg-white rounded-lg shadow-lg max-w-2xl"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{duration: 0.4}}
          >
            <button
              className="absolute top-2 right-2 text-white hover:text-black cursor-pointer"
              onClick={() => setSelectedImage(null)}
            >
              <X size={35} />
            </button>
            <img
              src={selectedImage}
              alt="Expanded"
              className="w-full h-auto rounded-lg"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default SectionDetails;
