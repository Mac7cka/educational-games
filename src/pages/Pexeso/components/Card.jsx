import React from "react";
import { motion } from "framer-motion";

const Card = ({ id, face, isFlipped, onClick, word }) => {
  return (
    <div
      className="w-28 h-28 md:w-32 md:h-36 perspective-1000"
      onClick={() => onClick(id)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Card Back */}
        <div className="absolute w-full h-full backface-hidden rounded-xl shadow-lg bg-gradient-to-br from-m-cambridge-blue-30 to-m-cambridge-blue-80 flex items-center justify-center cursor-pointer">
          <span className="text-5xl">?</span>
        </div>

        {/* Card Front */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-lg bg-gradient-to-br from-m-fairy-tale-light to-m-fairy-tale-darker flex items-center justify-center cursor-pointer">
          <img
          src={face}
          alt={word}
          className="w-20 h-20 lg:w-24 lg:h-24 object-contain"
        />
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
