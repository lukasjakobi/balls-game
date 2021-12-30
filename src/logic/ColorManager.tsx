import BallColorInterface from "../interfaces/BallColorInterface";

const COLOR_1: BallColorInterface = generateColor(72, 52, 212);
const COLOR_2: BallColorInterface = generateColor(242, 38, 38);
const COLOR_3: BallColorInterface = generateColor(76, 209, 55);
const COLOR_4: BallColorInterface = generateColor(179, 57, 57);
const COLOR_5: BallColorInterface = generateColor(0, 168, 255);
const COLOR_6: BallColorInterface = generateColor(251, 197, 49);
const COLOR_7: BallColorInterface = generateColor(19, 15, 64);
const COLOR_8: BallColorInterface = generateColor(255, 62, 212);
const COLOR_9: BallColorInterface = generateColor(165, 94, 234);
const COLOR_10: BallColorInterface = generateColor(255, 250, 101);
const COLOR_11: BallColorInterface = generateColor(34, 166, 179);
const COLOR_12: BallColorInterface = generateColor(255, 255, 255);
const COLOR_13: BallColorInterface = generateColor(0, 0, 0);

const COLORS: BallColorInterface[] = [
    COLOR_1,
    COLOR_2,
    COLOR_3,
    COLOR_4,
    COLOR_5,
    COLOR_6,
    COLOR_7,
    COLOR_8,
    COLOR_9,
    COLOR_10,
    COLOR_11,
    COLOR_12,
    COLOR_13,
]

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
    return COLORS.slice(0, length);
}

export function rgbToHex(red: number, green: number, blue: number): string
{
    return "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
}