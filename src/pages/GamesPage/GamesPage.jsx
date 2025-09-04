import React from "react";
import GameCards from "./GameCards";

function AllGamesMenu() {
   return (
    <div className="app-container">
      <div className="game-wrapper max-sm:mt-10 bg-gradient-to-br from-m-cambridge-blue-30 to-m-cambridge-blue-80 backdrop-blur-sm shadow-xl min-h-[60vh] flex flex-col justify-center items-center text-center px-6">
        <GameCards/>
      </div>
    </div>
  );
}

export default AllGamesMenu;
