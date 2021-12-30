import GameInterface from "../interfaces/GameInterface";
import Glass from "./Glass";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {isGameWon, registerClick, resetGame, revertMove} from "../logic/GameManager";
import {ArrowCircleLeftIcon, RefreshIcon, HomeIcon, ShareIcon} from "@heroicons/react/solid";
import {determineFirstGame} from "../logic/StorageManager";
import generateGameByLevel from "../logic/GameGenerator";
import {generateUUID} from "../logic/UUIDGenerator";
import ShareInterface from "../interfaces/ShareInterface";

export default function Game() {
    let loadedGame = determineFirstGame();

    let navigate = useNavigate();

    const [state, setState] = useState<number>(1);
    const [game, setGame] = useState<GameInterface>(loadedGame);

    return (
      <div className="flex-col w-screen h-screen">
          <div className="header">
              {/* MENU BUTTON */}
              <div className="basis-1/4">
                  <div className="button" onClick={() => {
                      navigate('/');
                  }}>
                      <HomeIcon className="text-white w-5 h-5 m-auto" />
                  </div>
              </div>
              {/* RESET BUTTON */}
              <div className="basis-1/4">
                  <div className="button" onClick={() => {
                      resetGame(game);
                      setState(state+1);
                  }}>
                      <RefreshIcon className="text-white w-5 h-5 m-auto" />
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
                  <div className="button" onClick={() => {
                      let share: ShareInterface = {
                          id: generateUUID(),
                          name: 'Shared Level',
                          glasses: game.glasses,
                      };

                      let json = JSON.stringify(share);
                      let hash = btoa(json);

                      navigate('/share/' + hash);

                      setState(state+1);
                  }}>
                      <ShareIcon className="text-white w-5 h-5 m-auto" />
                  </div>
              </div>
          </div>
          <div className="flex mt-6" id="level">
              <span className="text-xl text-gray-800 font-bold my-4 mx-auto">Level {game.level}</span>
          </div>
          <div id="glasses" className="mx-auto w-4/5 grid grid-cols-5 gap-2 m-auto">
              { game.glasses && game.glasses.map(glass => (
                  <div
                      key={"c_" + glass.id}
                      onClick={() => {
                          registerClick(game, glass, false);

                          if (isGameWon(game)) {
                              setGame(generateGameByLevel(game.level+1))
                              navigate('/');
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
