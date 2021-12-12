import GameInterface from "../interfaces/GameInterface";
import BallInterface from "../interfaces/BallInterface";
import GlassInterface from "../interfaces/GlassInterface";
import generateColor from "./ColorGenerator";
import BallColorInterface from "../interfaces/BallColorInterface";

const MAX_BALLS_PER_GLASS = 4;

interface PropsInterface {
    glasses: number;
    emptyGlasses: number;
}

export default function generateGame(props: PropsInterface): GameInterface {
    // amount of glasses to fill & colors to generate
    let glassesToFill = props.glasses - props.emptyGlasses;

    let colors: BallColorInterface[] = generateColors(glassesToFill);
    let balls: BallInterface[] = generateBalls(colors);
    let glasses: GlassInterface[] = generateGlasses(balls, props, glassesToFill);

    return {
        id: 1,
        glasses: glasses,
        balls: balls,
        colors: colors,
        steps: 0,
        resets: 0
    };
}

export function generateColors(amount: number): BallColorInterface[] {
    let colors: BallColorInterface[] = [];

    for (let i = 0; i < amount; i++) {
        colors.push(generateColor());
    }

    return colors;
}

export function generateBalls(colors: BallColorInterface[]): BallInterface[] {
    let balls: BallInterface[] = [];

    // generate MAX_BALLS_PER_GLASS balls per color
    colors.forEach((color, key) => {
        for (let i = 0; i < MAX_BALLS_PER_GLASS; i++) {
            balls.push({
                id: (key * MAX_BALLS_PER_GLASS) + i,
                color: color
            })
        }
    })

    return balls;
}

export function generateGlasses(balls: BallInterface[], props: PropsInterface, amount: number) {
    let glasses: GlassInterface[] = [];

    // generate full glasses with balls
    for (let i = 0; i < amount; i++) {
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
    for (let i = 0; i < props.emptyGlasses; i++) {
        glasses.push({
            id: (props.glasses + i),
            balls: []
        });
    }

    return glasses;
}