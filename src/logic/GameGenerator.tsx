import GameInterface from "../interfaces/GameInterface";
import BallInterface from "../interfaces/BallInterface";
import GlassInterface from "../interfaces/GlassInterface";
import generateColor from "./ColorGenerator";
import BallColorInterface from "../interfaces/BallColorInterface";

interface PropsInterface {
    glasses: number;
    emptyGlasses: number;
}

const MAX_BALLS_PER_GLASS = 4;

export default function generateGame(props: PropsInterface): GameInterface {
    // prepare colors
    let glassesToFill = props.glasses - props.emptyGlasses;
    let colors: BallColorInterface[] = [];

    for (let i = 0; i < glassesToFill; i++) {
        colors.push(generateColor());
    }

    // prepare balls
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

    // prepare glasses
    let glasses: GlassInterface[] = [];

    // generate full glasses with balls
    for (let i = 0; i < glassesToFill; i++) {
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

    return {
        id: 1,
        glasses: glasses,
        balls: balls,
        colors: colors,
        steps: 0,
        resets: 0
    };
}