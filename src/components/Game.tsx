import GameInterface from "../interfaces/GameInterface";
import Glass from "./Glass";
import {useState} from "react";
import {isGameWon, registerClick} from "../logic/GameManager";
import generateGame from "../logic/GameGenerator";

export default function Game() {
    const [state, setState] = useState<number>(1);
    const [game, setGame] = useState<GameInterface>(generateGame({level: 1}));

    return (
      <div
          className="w-full h-full flex flex-col"
      >
          <div className="flex m-auto mb-10">
              <span className="text-3xl text-center text-red-700 font-bold">
                  Level {game.level}
              </span>
          </div>
          <div
              className="flex"
          >
              { game.glasses && game.glasses.map(glass => (
                  <div
                      key={"glass_container_" + glass.id}
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
