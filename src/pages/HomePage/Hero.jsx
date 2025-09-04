import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { ChildNameContext } from "../../components/ChildNameContext";
import { games } from "../../data/index";

function Hero() {
  const { childName, setChildName } = useContext(ChildNameContext); 
  const [inputName, setInputName] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const navigate = useNavigate();

  

  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handleMagicClick = () => {
    const finalName = isInteractive ? childName : inputName;
    if (finalName.trim()) {
      setChildName(capitalize(finalName));
      const audio = new Audio("/magic.mp3");
      audio.play();
      setTimeout(() => setShowGreeting(true), 2000);
    };
  };

  const toggleInputMode = () => {
    setIsInteractive(!isInteractive);
    setInputName(""); 
    setChildName("");
  };

  // --- Text-to-Speech Functionality ---
  const speak = (word) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      console.log("Sorry, your browser doesn't support text-to-speech.");
    }
  };

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 770); 
    };

    checkScreenSize(); 
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  let displayedGames = [...games.slice(0, 9)];

  if (isSmallScreen) {
    // Swap 3/4 and 7/8 only on small screens
    [displayedGames[2], displayedGames[3]] = [displayedGames[3], displayedGames[2]];
    [displayedGames[6], displayedGames[7]] = [displayedGames[7], displayedGames[6]];
  }

  useEffect(() => {
    if (showGreeting && childName) {
      speak(`Welcome ${childName}`);
    }
  }, [showGreeting, childName]);


  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const letterColors = ["text-pink-400", "text-blue-400", "text-cyan-500", "text-teal-500"];

  const addLetter = (letter) => {
    if (childName.length < 12) {
      setChildName((prev) => prev + letter);
    }
  };

  const removeLast = () => {
    setChildName((prev) => prev.slice(0, -1));
  };

  const isMagicButtonDisabled = isInteractive ? !childName.trim() : !inputName.trim();
  
  // Consistent styling for both the input and the name display div
  const inputDisplayClasses = "block w-full rounded-md bg-m-baby-powder px-3.5 py-2 mt-8 text-base text-gray-500 min-h-[42px]";
  
  return (
    <div className="w-full">
      {!showGreeting && (
        <button
          onClick={() => navigate("/games")}
          className="absolute top-8 right-8 z-20 text-white font-semibold bg-red-300 hover:bg-m-xanthous px-3 py-1 rounded-lg text-sm"
        >
          ✕ Skip
        </button>
      )}

      <div id="hero-section" className="mx-auto max-w-7xl py-16 sm:px-3 sm:py-32">
        <div className="relative overflow-hidden lg:grid lg:grid-cols-2 gap-10 items-center bg-gradient-to-br from-m-cambridge-blue-30 to-m-cambridge-blue-80 backdrop-blur-sm shadow-xl px-6 pt-14 rounded-3xl sm:px-16 md:pt-24 lg:gap-x-14 lg:px-20 lg:pt-0">
          
          {/* Left Side */}
          <div className={`mx-auto max-w-lg text-center lg:mx-0 lg:p-4 lg:flex-auto lg:py-24 ${showGreeting ? "lg:text-center" : "lg:text-left"}`}>
            {!showGreeting ? (
              <>
                <h1 className="text-balance text-3xl font-semibold tracking-tight text-cyan-800 sm:text-4xl">Hello My little friend.</h1>
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-m-skye-blue sm:text-3xl">What is your name?</h2>
                <p className="mt-6 text-pretty text-lg/8 text-gray-500">
                  {isInteractive ? "Click the letters to spell your name." : "Type your name below or choose the interactive way!"}
                </p>
                
                {isInteractive ? (
                  <div className="flex items-center gap-x-2">
                    <div className={`${inputDisplayClasses} flex items-center`}>
                      {childName}
                    </div>
                    <button onClick={removeLast} aria-label="Backspace" className="rounded-md bg-m-baby-powder text-gray-600 hover:bg-red-100 self-strech p-2 mt-8 flex items-center">
                    X
                    </button>
                  </div>
                ) : (
                  <input
                    id="magic-name-input"
                    type="text"
                    autoComplete="given-name"
                    value={inputName}
                    required
                    onChange={(e) => setInputName(e.target.value)}
                    className={`${inputDisplayClasses} placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500`}
                  />
                )}
      
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                  <button onClick={handleMagicClick} disabled={isMagicButtonDisabled} className="animate-glow rounded-md bg-red-300 px-5 py-2.5 text-sm font-semibold text-white hover:bg-m-xanthous ">
                    Make Magic <AutoAwesomeIcon className="pl-2" style={{ color: "#C88089" }} />
                  </button>
                  <button onClick={toggleInputMode} className="btn-link text-sm/6 font-semibold text-m-xanthous hover:text-red-300 shadow-sm p-2">
                    {isInteractive ? "Type with keyboard" : "Interactive selection"}
                    <span aria-hidden="true" className="hidden lg:inline animate-bounce ml-1">→</span>
                  </button>
                </div>
              </>
            ) : (
              <AnimatePresence>
                <motion.div key="greeting" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="p-10 rounded-2xl shadow-xl bg-gradient-to-br from-m-cambridge-blue-30 to-m-cambridge-blue-80 text-center max-sm:mb-12 max-lg:mb-12">
                  <h1 className="flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-800 gap-2">
                    <span role="img" aria-label="sparkles">✨</span>
                    {/* Using childName here is more robust as it holds the name from either input method */}
                    <span className="whitespace-nowrap">Welcome, {childName}!</span>
                    <span role="img" aria-label="sparkles">✨</span>
                  </h1>
                  <p className="mt-4 text-lg text-gray-500">Choose your magical adventure!</p>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Right Side */}
          <div className="flex justify-center items-center h-full min-h-[300px] lg:min-h-0">
            {!showGreeting ? (
              isInteractive ? (
                <div className="grid grid-cols-7 gap-2 text-center w-full max-w-lg p-4">
                  {alphabet.map((letter, index) => (
                    <button key={letter} onClick={() => addLetter(letter)} className={`font-bold md:text-4xl sm:text-3xl p-1 rounded-lg transition-transform duration-200 hover:scale-110 hover:bg-white/50 ${letterColors[index % letterColors.length]}`}>
                      {letter}
                    </button>
                  ))}
                </div>
              ) : (
                <img width="1824" height="1080" src="/hero-img.svg" alt="A bear reading a book" className="rounded-lg max-w-full h-auto lg:w-[37rem] xl:ml-40 xl:w-[44rem] xl:pr-1 xl:left-96 lg:absolute lg:pr-6 lg:left-1/2 xl:top-14 lg:top-20 max-md:pb-10" />
              )
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="grid mb-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:pb-4 p-6 w-full max-w-2xl xl:max-w-3xl max-md:pb-14">
                {displayedGames.map((game, i) => (
                  <motion.div key={game.id} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.15, type: "spring", stiffness: 200, damping: 20 }} className={`h-auto ${game.bgColor} max-w-full rounded-xl shadow-lg ${i === 8 ? "hidden sm:block" : ""}`}>
                    {game.href && (
                      <button onClick={() => navigate(game.link)} aria-label={`Open ${game.title}`} className="transform transition duration-300 hover:scale-105 hover:-translate-y-1 max-md:aspect-square w-full h-full flex flex-col items-center justify-center text-white text-lg font-semibold text-center px-2 drop-shadow-md">
                        <img src={game.href} alt={game.title} className="inset-0 w-full h-full object-cover rounded-xl" />
                        <span className="-mt-5">{game.title}</span>
                      </button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;