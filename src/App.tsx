import React from 'react';
import './App.css';
import generateGame from "./logic/GameGenerator";
import GameInterface from "./interfaces/GameInterface";
import Game from "./components/Game";

function App() {
  const game: GameInterface = generateGame({glasses: 8, emptyGlasses: 2})

  return (
    <div className="app w-screen h-screen flex bg-yellow-50">
      <div className="my-auto mx-auto">
        <Game
            key={game.id}
            id={game.id}
            glasses={game.glasses}
            balls={game.balls}
            colors={game.colors}
            steps={game.steps}
            resets={game.resets}
        />
      </div>
    </div>
  );
}

export default App;
