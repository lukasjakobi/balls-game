import BallInterface from "../interfaces/BallInterface";
import GameInterface from "../interfaces/GameInterface";
import GlassInterface from "../interfaces/GlassInterface";
import MoveInterface from "../interfaces/MoveInterface";
import generateGame from "./GameGenerator";

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
            activeBall.active = false;

            // remove ball from old glass and add to new glass
            balls.unshift(activeBall);
            activeGlass.balls.splice(0, 1);

            // record move
            let move: MoveInterface = {
                ball: activeBall,
                from: activeGlass,
                to: glass
            }

            game.moves.push(move);

            // write to local storage
            localStorage.setItem('game_info', JSON.stringify(game));

            // don't activate new ball after successfully merging
            return;
        }

        // if same glass is pressed as before, stop execution
        if (activeGlass.id === glass.id) {
            resetBalls(game.glasses);
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

export function revertMove(game: GameInterface) {
    let move: MoveInterface = game.moves[game.moves.length - 1];

    if (move === undefined) {
        return;
    }

    let from: GlassInterface = game.glasses[move.from.id];
    let to: GlassInterface = game.glasses[move.to.id];

    from.balls.unshift(move.ball);
    to.balls.splice(0, 1);

    game.moves.splice(game.moves.length - 1, 1);
}

export function resetGame(game: GameInterface) {
    for (let i = game.moves.length - 1; i >= 0; i--) {
        let move: MoveInterface = game.moves[i];

        if (move === undefined) {
            return;
        }

        let from: GlassInterface = game.glasses[move.from.id];
        let to: GlassInterface = game.glasses[move.to.id];

        from.balls.unshift(move.ball);
        to.balls.splice(0, 1);

        game.moves.splice(i, 1);
    }

    game.resets = 0;
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

    return from.color.red === to.color.red
        && from.color.green === to.color.green
        && from.color.blue === to.color.blue;
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

            if (
                color.red !== ball.color.red
                || color.green !== ball.color.green
                || color.blue !== ball.color.blue
            ) {
                return false;
            }
        }

        if (amount < 4) {
            return false;
        }
    }

    return true;
}

export function determineFirstGame(): GameInterface
{
    let localGame = localStorage.getItem('game_info');

    if (localGame !== null) {
        return JSON.parse(localGame);
    }

    return generateGame({level: 1})
}