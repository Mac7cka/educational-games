import React, { useState, useEffect, useCallback, useRef } from 'react';
import correctAnswerSound from "../../assets/sounds/correct.mp3";
import incorrectAnswerSound from "../../assets/sounds/wrong.mp3";
import useSound from "use-sound";
import GameCard from './components/GameCard';
import { wordsList  } from '../../data/words';


// === HELPER FUNCTION to shuffle arrays ===
const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};


// === MAIN APP COMPONENT ===
function LearnEnglish() {
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [cards, setCards] = useState([]);
  const [correctWord, setCorrectWord] = useState(null);
  const [feedback, setFeedback] = useState(null); 
  const [speakCount, setSpeakCount] = useState({}); 
  const [speakableWords, setSpeakableWords] = useState([]);

  
  // === SOUNDS  ===
  const [playCorrectSound] = useSound(correctAnswerSound);
  const [playIncorrectSound] = useSound(incorrectAnswerSound);
  
  // --- Game Logic ---
  const setupNewRound = useCallback(() => {
    setFeedback(null);

    const availableWords = wordsList.filter(word => (speakCount[word.word] || 0) < 3);
    if (availableWords.length === 0) {
      console.log("All words have been spoken 3 times! Resetting counts.");
      setSpeakCount({});
      setSpeakableWords(wordsList);
      return;
    }
    
    const shuffledWords = shuffleArray(availableWords).slice(0, 10);    
    const correctOption = shuffledWords[0];
    const incorrectOptions = shuffledWords.slice(1, 3);    
    const currentCards = shuffleArray([correctOption, ...incorrectOptions]);
    
    setCards(currentCards);
    setCorrectWord(correctOption);
    setSpeakableWords(availableWords);
    
    setSpeakCount((prev) => ({
    ...prev,
    [correctOption.word]: (prev[correctOption.word] || 0) + 1
  }));
  
    // Pronounce the word
    speak(correctOption.word);
    console.log(correctOption.word);
  }, []);

  // Initialize game on first load
  useEffect(() => {
    setupNewRound();
  }, [setupNewRound, currentRound]);

  // --- Text-to-Speech Functionality ---
  const speak = (word) => {
    const count = speakCount[word] || 0;

    if (count >= 3) {
      return;
    }
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);

      setSpeakCount((prev) => ({
        ...prev,
        [word]: (prev[word] || 0) + 1
      }));
    } else {
      console.log("Sorry, your browser doesn't support text-to-speech.");
    }
  };



  // --- Handle User's Guess ---
  const handleGuess = (selectedItem) => {
    if (selectedItem.word === correctWord.word) {
      setScore(score + 1);
      setFeedback({ word: selectedItem.word, isCorrect: true });
      playCorrectSound();

      // Move to next round *only after correct answer*
      setTimeout(() => {
        setCurrentRound((prev) => prev + 1);
      }, 1500);
    } else {
      setFeedback({ word: selectedItem.word, isCorrect: false });
      playIncorrectSound();
      setTimeout(() => {
        setFeedback(null);
      }, 1000);
    }
};


  return (
    <div className="app-container">
      <div className="game-wrapper max-sm:mt-10 bg-gradient-to-br from-m-cambridge-blue-30 to-m-cambridge-blue-80 backdrop-blur-sm shadow-xl ">
        <header className="text-center mb-8">
          <h1 className="text-4xl text-[var(--m-blue-green)] font-semibold">Listen and Choose!</h1>
          <p className="text-xl text-gray-500 font-medium">Click the card that matches the word you hear.</p>
        </header>

        {/* --- Listen Again Button & Score --- */}
        <div className="flex justify-between items-center mb-10 max-md:px-2 max-sm:px-1.5 md:px-12">
            <button 
              onClick={() => speak(correctWord?.word)}
              className=" green-gradient px-6 max-sm:px-2.5 max-sm:py-2 py-3 text-white font-bold rounded-xl shadow-sm transition-all"
            >
              Hear Again 🔊
            </button>
            <div className="font-bold text-white max-sm:px-2 max-sm:py-2 px-6 py-3 rounded-xl shadow-sm">
              {correctWord?.word}
            </div>
            <div className="font-bold text-white max-sm:px-2 max-sm:py-2 px-6 py-3 rounded-xl shadow-sm">
              Score: {score}
            </div>
        </div>

        {/* --- Cards Display --- */}
        <main className="flex justify-around items-center">
          {cards.map((item) => (
            <GameCard 
              key={item.word} 
              item={item} 
              handleGuess={handleGuess}
              feedback={feedback}
            />
          ))}
        </main>
      </div>
    </div>
  );
};

export default LearnEnglish;