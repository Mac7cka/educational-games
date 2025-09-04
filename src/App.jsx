import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import AllGamesMenu from "./pages/GamesPage/GamesPage";
import AppLayout from "./components/AppLayout";
import Hero from "./pages/HomePage/Hero";
import { ChildNameProvider } from "./components/ChildNameContext";
import PexesoGame from "./pages/Pexeso/Pexeso";
import LearnEnglish from "./pages/LearnEnglishGame/LearnEnglish";
import Puzzle from "./pages/Puzzle/Puzzle";
import ColoringBook from "./pages/ColoringBook/ColoringBook";

function Layout() {
  const location = useLocation();

  return (
    <div>
      {/* Show Header only if NOT on "/"  */}
      {location.pathname !== "/" && <Header />}

      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/games" element={<AllGamesMenu />} />
          <Route path="/coloring" element={<ColoringBook />} />
          <Route path="/pexeso" element={<PexesoGame />} />
          <Route path="/learn-english" element={<LearnEnglish />} />
          <Route path="/puzzle" element={<Puzzle />} />
        </Route>
      </Routes>    
    </div>
  );
}

function App() {
  return (
    <ChildNameProvider>
      <Router>
        <Layout />
      </Router>
    </ChildNameProvider>
  );
}

export default App;
