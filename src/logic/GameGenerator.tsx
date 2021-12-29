import GameInterface from "../interfaces/GameInterface";
import BallInterface from "../interfaces/BallInterface";
import GlassInterface from "../interfaces/GlassInterface";
import BallColorInterface from "../interfaces/BallColorInterface";
import {getEmptyGlassAmount, getGlassAmount} from "./LevelManager";
import getColorsArray from "./ColorGenerator";

const MAX_BALLS_PER_GLASS = 4;

interface PropsInterface {
    level: number;
}

export default function generateGame(props: PropsInterface): GameInterface {
    let glassAmount = getGlassAmount(props.level);
    let emptyGlassAmount = getEmptyGlassAmount(props.level);

    // amount of glasses to fill & colors to generate
    let glassesToFill = glassAmount - emptyGlassAmount;

    let colors: BallColorInterface[] = getColorsArray(glassesToFill);
    let balls: BallInterface[] = generateBalls(colors);
    let glasses: GlassInterface[] = generateGlasses(balls, glassAmount, emptyGlassAmount);

    return {
        id: 1,
        level: props.level,
        glasses: glasses,
        balls: balls,
        colors: colors,
        moves: [],
        resets: 0,
        resetsMax: 5
    };
}

export function generateBalls(colors: BallColorInterface[]): BallInterface[] {
    let balls: BallInterface[] = [];

    // generate MAX_BALLS_PER_GLASS balls per color
    colors.forEach((color, key) => {
        for (let i = 0; i < MAX_BALLS_PER_GLASS; i++) {
            balls.push({
                id: (key * MAX_BALLS_PER_GLASS) + i,
                color: color,
                active: false
            })
        }
    })

    return balls;
}

export function generateGlasses(balls: BallInterface[], glassAmount: number, emptyGlassAmount: number) {
    let glasses: GlassInterface[] = [];

    // generate full glasses with balls
    for (let i = 0; i < (glassAmount - emptyGlassAmount); i++) {
        let currentBalls: BallInterface[] = [];

        for (let n = 0; n < MAX_BALLS_PER_GLASS; n++) {
            let index: number = Math.floor(Math.random() * balls.length);

            if (balls.length <= index) {
                break;
            }

            currentBalls.push(balls[index]);
            balls.splice(index, 1);
        }

        glasses.push({
            id: i,
            balls: currentBalls
        });
    }

    // generate empty glasses
    for (let i = 0; i < emptyGlassAmount; i++) {
        glasses.push({
            id: ((glassAmount - emptyGlassAmount) + i),
            balls: []
        });
    }

    return glasses;
}