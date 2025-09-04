// === CARD COMPONENT ===
import React from 'react'

const GameCard = ({ item, handleGuess, feedback }) => {
  const isCorrect = feedback?.isCorrect && feedback?.word === item.word;
  const isIncorrect = !feedback?.isCorrect && feedback?.word === item.word;

  // Determine card styling based on feedback
  const cardStyle = () => {
    if (isCorrect) {
      return "border-m-cambridge-blue scale-105 shadow-xl";
    }
    if (isIncorrect) {
      return "border-red-600 border-dotted border-1 opacity-50 shake-animation";
    }
    return "border-transparent hover:scale-105 hover:shadow-lg";
  };

  return (
    <div
  onClick={() => (!feedback || !feedback.isCorrect) && handleGuess(item)}
  className={`
    flex flex-col items-center justify-center
    bg-[var(--m-baby-powder)]
    w-[28vw] h-[34vw]       /* base: scale with viewport width */
    max-sm:mx-1         
    sm:w-32 sm:h-40         /* small screens */
    md:w-40 md:h-48         /* medium screens */
    lg:w-48 lg:h-56         /* large screens */
    rounded-2xl cursor-pointer
    transition-all duration-300 border-4
    ${cardStyle()}
  `}
>
  <img
  src={item.visual}
  alt={item.word}
  className="w-[12vw] max-sm:w-20 sm:w-24 md:w-28 lg:w-32 object-contain"
/>
</div>

  );
};

export default GameCard
