import React, { useState, useEffect, useCallback } from "react";
import Card from "./components/Card";
import { Link } from "react-router-dom";
import { wordsList } from "../../data/words";
import useSound from "use-sound";


// Shuffle
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

const generateGameBoard = () => {
  const randomSelection = shuffleArray(wordsList).slice(0,6);
  const pairedItems = [...randomSelection, ...randomSelection];
  const shuffledItems = shuffleArray(pairedItems);
  return shuffledItems.map((item, index) => ({
    id: index,
    face : item.visual,
    word : item.word,
    isFlipped: false,
    isMatched: false,
  }));
};

const speak = (word) => {
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);

    }
};

const PexesoGame = () => {
  const [cards, setCards] = useState(generateGameBoard());
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setCards(generateGameBoard());
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setWinner(null);
  };

  const handleCardClick = (id) => {
    if (flippedCards.length >= 2 || cards[id].isFlipped) return;

    const newCards = cards.map((card) =>
      card.id === id ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);
    setFlippedCards([...flippedCards, id]);
  };

  const processTurn = useCallback(() => {
    if (flippedCards.length < 2) return;

    const [firstId, secondId] = flippedCards;
    const firstCard = cards.find((c) => c.id === firstId);
    const secondCard = cards.find((c) => c.id === secondId);
    if (!firstCard || !secondCard) return;

    setMoves((m) => m + 1);

    if (firstCard.face === secondCard.face) {
      // Match!
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.face === firstCard.face ? { ...card, isMatched: true } : card
        )
      );
      setMatches((m) => m + 1);
      setFlippedCards([]);
      const audio = new Audio("/achievement-bell.mp3");
      audio.play();
      setTimeout(() => {
      speak(firstCard.word);
      }, 1200)
    } else {
      // Not a match → flip back
      setTimeout(() => {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstId || card.id === secondId
              ? { ...card, isFlipped: false }
              : card
          )
        );
        setFlippedCards([]);
      }, 1200);
    }
  }, [flippedCards, cards]);

  // Check matches each turn
  useEffect(() => {
    processTurn();
  }, [processTurn]);

  // Winner check
  useEffect(() => {
    if (cards.length > 0 && cards.every((c) => c.isMatched)) {
      setWinner(`🎉 You Win! Completed in ${moves} moves.`);
    }
  }, [cards, moves]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center lg:overflow-hidden">
        <Link
            to="/"
            className="absolute top-4 right-4 z-20 text-white font-semibold bg-red-300 hover:bg-m-xanthous px-3 py-1 rounded-lg text-sm max-md:top-16"
        >
         ✕ Close
        </Link>
      <h1 className="text-5xl md:text-6xl font-bold text-m-old-rose mb-2">
        Pexeso
      </h1>
      <p className="text-lg text-m-blue-green mb-4">
        Moves: {moves} | Matches: {matches}
      </p>

      <div className="grid grid-cols-4 gap-3 md:gap-4 max-sm:grid-cols-3 mb-6">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            face={card.face}
            word={card.word}
            isFlipped={card.isFlipped || card.isMatched}
            onClick={handleCardClick}
          />
        ))}
      </div>

      {winner && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className=" bg-gradient-to-br from-m-cambridge-blue-50 to-m-cambridge-blue p-8 rounded-lg text-center shadow-2xl">
            <h2 className="text-4xl font-bold text-m-baby-powder mb-4">{winner}</h2>
            <button
              onClick={resetGame}
              className="animate-glow magic-btn"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PexesoGame;
