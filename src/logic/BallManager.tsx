import BallColorInterface from "../interfaces/BallColorInterface";
import BallInterface from "../interfaces/BallInterface";
import {MAX_BALLS_PER_GLASS} from "./GlassManager";

export function generateBalls(colors: BallColorInterface[]): BallInterface[]
{
    let balls: BallInterface[] = [];

    // generate MAX_BALLS_PER_GLASS balls per color
    colors.forEach((color, key) => {
        for (let i = 0; i < MAX_BALLS_PER_GLASS; i++) {
            let id = (key * MAX_BALLS_PER_GLASS) + i;
            let ball = generateBall(id, color);

            if (ball === null) {
                continue;
            }

            balls.push(ball);
        }
    })

    return balls;
}

export function generateBall(id: number, color: BallColorInterface): BallInterface
{
    return {
        id: id,
        color: color,
        active: false
    }
}