import BallColorInterface from "../interfaces/BallColorInterface";

export default function generateColor(): BallColorInterface {
    let red: number = Math.floor(Math.random() * 255) + 1;
    let green: number = Math.floor(Math.random() * 255) + 1;
    let blue: number = Math.floor(Math.random() * 255) + 1;

    return {
        red: red,
        green: green,
        blue: blue,
        hex: rgbToHex(red, green, blue)
    }
}

function rgbToHex(red: number, green: number, blue: number) {
    return "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
}