import BallColorInterface from "../interfaces/BallColorInterface";

const COLOR_RED: BallColorInterface = generateColor(255, 0, 0);
const COLOR_ORANGE: BallColorInterface = generateColor(255, 127, 0);
const COLOR_YELLOW: BallColorInterface = generateColor(249, 215, 10);
const COLOR_GREEN_YELLOW: BallColorInterface = generateColor(127, 255, 0);
const COLOR_GREEN: BallColorInterface = generateColor(5, 160, 2);
const COLOR_GREEN_CYAN: BallColorInterface = generateColor(10, 250, 180);
const COLOR_CYAN: BallColorInterface = generateColor(0, 255, 255);
const COLOR_BLUE_CYAN: BallColorInterface = generateColor(0, 127, 255);
const COLOR_BLUE: BallColorInterface = generateColor(0, 0, 255);
const COLOR_BLUE_MAGENTA: BallColorInterface = generateColor(127, 0, 255);
const COLOR_MAGENTA: BallColorInterface = generateColor(255, 0, 255);
const COLOR_RED_MAGENTA: BallColorInterface = generateColor(187, 0, 127);

export function generateColor(red: number, green: number, blue: number): BallColorInterface
{
    return {
        red: red,
        green: green,
        blue: blue,
        hex: rgbToHex(red, green, blue)
    }
}

export default function getColors(length: number): BallColorInterface[]
{
    let all: BallColorInterface[] = [
        COLOR_RED,
        COLOR_ORANGE,
        COLOR_BLUE,
        COLOR_GREEN,
        COLOR_YELLOW,
        COLOR_GREEN_YELLOW,
        COLOR_CYAN,
        COLOR_BLUE_CYAN,
        COLOR_GREEN_CYAN,
        COLOR_MAGENTA,
        COLOR_RED_MAGENTA,
        COLOR_BLUE_MAGENTA,
    ]

    let colors: BallColorInterface[] = [];

    for (let i = 0; i < length; i++) {
        colors.push(all[i]);
        all.splice(i, 1);
    }

    return colors;
}

export function rgbToHex(red: number, green: number, blue: number): string
{
    return "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
}