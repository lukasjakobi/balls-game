import BallInterface from "../interfaces/BallInterface";
import GlassInterface from "../interfaces/GlassInterface";

export const MAX_BALLS_PER_GLASS = 4;

export function generateGlass(id: number, balls: BallInterface[]): GlassInterface
{
    return {
        id: id,
        balls: balls.slice(0, MAX_BALLS_PER_GLASS)
    }
}

export function generateGlasses(balls: BallInterface[], glassAmount: number, emptyGlassAmount: number): GlassInterface[]
{
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

        let glass = generateGlass(i, currentBalls);

        if (glass === null) {
            continue;
        }

        glasses.push(glass);
    }

    // generate empty glasses
    for (let i = 0; i < emptyGlassAmount; i++) {
        let glass = generateGlass((glassAmount - emptyGlassAmount) + i, []);

        if (glass === null) {
            continue;
        }

        glasses.push(glass);
    }

    return glasses;
}