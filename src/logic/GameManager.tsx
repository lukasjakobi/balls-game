import BallInterface from "../interfaces/BallInterface";
import GameInterface from "../interfaces/GameInterface";
import GlassInterface from "../interfaces/GlassInterface";

export function registerClick(game: GameInterface, glass: GlassInterface): void
{
    let balls = glass.balls;
    let top: BallInterface = balls[0];

    if (isAlreadyActive(game.glasses)) {
        let activeBall = getActiveBall(game.glasses);
        let activeGlass = getActiveGlass(game.glasses);

        if (activeGlass === null || activeBall === null) {
            return;
        }

        // check if active ball can be put on current top ball
        if (canBeMerged(activeBall, top, balls.length)) {
            // add step
            game.steps++;

            activeBall.active = false;

            // remove ball from old glass and add to new glass
            balls.unshift(activeBall);
            activeGlass.balls.splice(0, 1);

            // don't activate new ball after win
            return;
        }
    }

    if (top === undefined) {
        return;
    }

    resetBalls(game.glasses);

    // toggle state of top ball
    top.active = true;
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
        if (!glass.balls.length) {
            continue;
        }

        for (let ball of glass.balls) {
            ball.active = false;
        }
    }
}

export function isGameWon(game: GameInterface): boolean
{
    // checks all balls if colors are the same,
    // if colors are different or less than 4 balls are in glass,
    // game is not won
    for (let glass of game.glasses) {
        if (!glass.balls.length) {
            continue;
        }

        let color = null;
        let amount = 0;

        for (let ball of glass.balls) {
            amount ++;

            if (color === null) {
                color = ball.color;
                continue;
            }

            if (color !== ball.color) {
                return false;
            }
        }

        if (amount < 4) {
            return false;
        }
    }

    return true;
}