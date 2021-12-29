import GameInterface from "../interfaces/GameInterface";
import Glass from "./Glass";
import {useState} from "react";
import generateGame from "../logic/GameGenerator";
import {isGameWon, registerClick, resetGame, revertMove} from "../logic/GameManager";
import {ArrowCircleLeftIcon, MenuIcon, RewindIcon, ViewGridAddIcon} from "@heroicons/react/solid";

export default function Game() {
    const [state, setState] = useState<number>(1);
    const [game, setGame] = useState<GameInterface>(generateGame({level: 40}));

    return (
      <div className="flex-col w-screen h-screen">
          <div className="header">
              {/* MENU BUTTON */}
              <div className="basis-1/4">
                  <div className="button">
                      <MenuIcon className="text-white w-5 h-5 m-auto" />
                  </div>
              </div>
              {/* RESET BUTTON */}
              <div className="basis-1/4">
                  <div className="button" onClick={() => {
                      resetGame(game);
                      setState(state+1);
                  }}>
                      <RewindIcon className="text-white w-5 h-5 m-auto" />
                  </div>
              </div>
              {/* UNDO BUTTON */}
              <div className="basis-1/4">
                  <div className="button" id="btn_retries" onClick={() => {
                      if (game.resets >= game.resetsMax || !game.moves.length) {
                          return;
                      }

                      revertMove(game);

                      game.resets ++;
                      setState(state+1);
                  }}>
                      <ArrowCircleLeftIcon className="text-white w-5 h-5 m-auto mr-0" />
                      <span className="m-auto ml-1 text-lg">{game.resetsMax - game.resets}</span>
                  </div>
              </div>
              {/* ADD GLASS */}
              <div className="basis-1/4">
                  <div className="button">
                      <ViewGridAddIcon className="text-white w-5 h-5 m-auto" />
                  </div>
              </div>
          </div>
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
