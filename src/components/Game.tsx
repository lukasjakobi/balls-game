import GameInterface from "../interfaces/GameInterface";
import Glass from "./Glass";
import BallInterface from "../interfaces/BallInterface";
import {useState} from "react";
import GlassInterface from "../interfaces/GlassInterface";

export default function Game(props: GameInterface) {
    const [state, setState] = useState(1);

    return (
      <div className="game w-full h-full">
          { props.glasses && props.glasses.map(glass => (
              <div
                key={glass.id}
                onClick={() => {
                    let balls = glass.balls;
                    let top: BallInterface = balls[0];

                    if (isAlreadyActive(props.glasses)) {
                        let activeBall = getActiveBall(props.glasses);
                        let activeGlass = getActiveGlass(props.glasses);

                        if (activeGlass === null || activeBall === null) {
                            return;
                        }

                        // check if active ball can be put on current top ball
                        if (canBeMerged(activeBall, top, glass.balls.length)) {
                            // merge from one to other glass
                            activeBall.active = false;
                            glass.balls.unshift(activeBall);
                            activeGlass.balls.splice(activeGlass.balls.indexOf(activeBall), 1);
                            setState(state+1);
                            return;
                        }
                    }

                    if (top === undefined) {
                        return;
                    }

                    resetBalls(props.glasses);

                    // toggle state of top ball
                    top.active = true;
                    setState(state+1);
                }}
              >
                  <Glass
                      key={glass.id}
                      id={glass.id}
                      balls={glass.balls}
                  />
              </div>

          ))}
      </div>
    );
}

function isAlreadyActive(glasses: GlassInterface[]): boolean
{
    for (let glass of glasses) {
        let top: BallInterface = glass.balls[0];

        if (top === undefined) {
            continue;
        }

        if (top.active) {
            return true;
        }
    }

    return false;
}

function getActiveBall(glasses: GlassInterface[]): BallInterface|null
{
    for (let glass of glasses) {
        let top: BallInterface = glass.balls[0];

        if (top === undefined) {
            continue;
        }

        if (top.active) {
            return top;
        }
    }

    return null;
}

function getActiveGlass(glasses: GlassInterface[]): GlassInterface|null
{
    for (let glass of glasses) {
        let top: BallInterface = glass.balls[0];

        if (top === undefined) {
            continue;
        }

        if (top.active) {
            return glass;
        }
    }

    return null;
}

function canBeMerged(from: BallInterface, to: BallInterface|undefined, sizeTo: number): boolean
{
    if (to === undefined) {
        return true;
    }

    if (sizeTo >= 4) {
        return false;
    }

    if (from === undefined) {
        return true;
    }

    return from.color === to.color;
}

function resetBalls(glasses: GlassInterface[])
{
    for (let glass of glasses) {
        for (let ball of glass.balls) {
            ball.active = false;
        }
    }
}