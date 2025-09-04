import { games } from "../../data";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function GameCards() {
  const navigate = useNavigate();

  // Filter out only ColorCard
  const filteredGames = games.filter((game) => game.title !== "ColorCard");

  return (
    <div className="w-full flex justify-center py-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-2xl xl:max-w-3xl p-4"
      >
        {filteredGames.map((game, i) => {
          const isDisabled = ["Puzzle", "Coloring"].includes(game.title);

          return (
            <motion.div
              key={game.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: i * 0.15,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
              className={`relative rounded-xl shadow-lg overflow-hidden flex flex-col ${game.bgColor} ${
                isDisabled ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <button
                onClick={() => !isDisabled && navigate(game.link)}
                aria-label={`Open ${game.title}`}
                disabled={isDisabled}
                className={`flex-1 w-full flex flex-col items-center justify-center text-white font-semibold text-center transition-transform duration-300 ${
                  isDisabled ? "" : "hover:scale-105 hover:-translate-y-1"
                }`}
              >
                
                  <img
                    src={game.href}
                    alt={game.title}
                    className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-t-xl"
                  />
               

                {/* Bottom bar */}
                <div className="py-2 bg-black/30 w-full text-sm md:text-base mt-auto text-center">
                  {game.title}
                </div>
              </button>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default GameCards;
