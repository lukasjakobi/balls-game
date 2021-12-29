import GameInterface from "../interfaces/GameInterface";
import Glass from "./Glass";
import {useState} from "react";
import generateGame from "../logic/GameGenerator";
import Header from "./Header";
import {isGameWon, registerClick} from "../logic/GameManager";

export default function Game() {
    const [state, setState] = useState<number>(1);
    const [game, setGame] = useState<GameInterface>(generateGame({level: 40}));

    return (
      <div className="flex-col w-screen h-screen">
          <Header
              resetsMax={game.resetsMax}
              resets={game.resets}
          />
          <div className="flex mt-6" id="level">
              <span className="text-xl text-gray-800 font-bold my-4 mx-auto">Level {game.level}</span>
          </div>
          <div id="glasses" className="mx-auto w-3/4 grid grid-cols-4 gap-2 m-auto">
              { game.glasses && game.glasses.map(glass => (
                  <div
                      key={"c_" + glass.id}
                      onClick={() => {
                          registerClick(game, glass);

                          if (isGameWon(game)) {
                              setGame(generateGame({level: game.level+1}))
                          }

                          setState(state+1);
                      }}
                  >
                      <Glass
                          key={"glass_" + glass.id}
                          id={glass.id}
                          balls={glass.balls}
                      />
                  </div>
              ))}
          </div>
      </div>
    );
}
