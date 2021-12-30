import GameInterface from "../interfaces/GameInterface";
import BallInterface from "../interfaces/BallInterface";
import GlassInterface from "../interfaces/GlassInterface";
import BallColorInterface from "../interfaces/BallColorInterface";

import {getEmptyGlassAmount, getGlassAmount} from "./LevelManager";
import getColors from "./ColorManager";
import {saveGameInformation} from "./StorageManager";
import {generateGlasses} from "./GlassManager";
import {generateBalls} from "./BallManager";

export const MAX_RESETS = 5;

export default function generateGameByLevel(level: number): GameInterface
{
    let glassAmount = getGlassAmount(level);
    let emptyGlassAmount = getEmptyGlassAmount();

    // amount of glasses to fill & colors to generate
    let glassesToFill = glassAmount - emptyGlassAmount;

    let colors: BallColorInterface[] = getColors(glassesToFill);
    let balls: BallInterface[] = generateBalls(colors);
    let glasses: GlassInterface[] = generateGlasses(balls, glassAmount, emptyGlassAmount);

    let game: GameInterface = {
        id: 1,
        level: level,
        glasses: glasses,
        balls: balls,
        colors: colors,
        moves: [],
        resets: 0,
        resetsMax: MAX_RESETS
    };

    // save score to local storage
    saveGameInformation(game);

    return game;
}

export function generateGame(glassAmount: number, emptyGlassAmount: number): GameInterface
{
    // amount of glasses to fill & colors to generate
    let glassesToFill = glassAmount - emptyGlassAmount;

    let colors: BallColorInterface[] = getColors(glassesToFill);
    let balls: BallInterface[] = generateBalls(colors);
    let glasses: GlassInterface[] = generateGlasses(balls, glassAmount, emptyGlassAmount);

    let game: GameInterface = {
        id: 1,
        level: -1,
        glasses: glasses,
        balls: balls,
        colors: colors,
        moves: [],
        resets: 0,
        resetsMax: MAX_RESETS
    };

    // save score to local storage
    saveGameInformation(game);

    return game;
}