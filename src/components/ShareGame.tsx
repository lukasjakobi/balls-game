import GameInterface from "../interfaces/GameInterface";
import Glass from "./Glass";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {isGameWon, registerClick, resetGame, revertMove} from "../logic/GameManager";
import {ArrowCircleLeftIcon, RefreshIcon, HomeIcon} from "@heroicons/react/solid";
import ShareInterface from "../interfaces/ShareInterface";

export default function ShareGame(props: ShareInterface) {
    let loadedGame = generateSharedGame(props);

    let navigate = useNavigate();

    const [state, setState] = useState<number>(1);
    const [game] = useState<GameInterface>(loadedGame);

    return (
      <div className="flex-col w-screen h-screen">
          <div className="header">
              {/* MENU BUTTON */}
              <div className="basis-1/3">
                  <div className="button" onClick={() => {
                      navigate('/');
                  }}>
                      <HomeIcon className="text-white w-5 h-5 m-auto" />
                  </div>
              </div>
              {/* RESET BUTTON */}
              <div className="basis-1/3">
                  <div className="button" onClick={() => {
                      resetGame(game);
                      setState(state+1);
                  }}>
                      <RefreshIcon className="text-white w-5 h-5 m-auto" />
                  </div>
              </div>
              {/* UNDO BUTTON */}
              <div className="basis-1/3">
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
          </div>
          <div className="flex mt-6" id="level">
              <span className="text-xl text-gray-800 font-bold my-4 mx-auto">{props.name}</span>
          </div>
          <div id="glasses" className="mx-auto w-4/5 grid grid-cols-5 gap-2 m-auto">
              { game.glasses && game.glasses.map(glass => (
                  <div
                      key={"c_" + glass.id}
                      onClick={() => {
                          registerClick(game, glass, true);

                          if (isGameWon(game)) {
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

function generateSharedGame(share: ShareInterface): GameInterface
{
    return {
        id: 1,
        glasses: share.glasses,
        moves: [],
        colors: [],
        balls: [],
        level: 0,
        resets: 0,
        resetsMax: 5
    }
}