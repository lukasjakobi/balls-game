import GlassInterface from "./GlassInterface";
import BallInterface from "./BallInterface";
import BallColorInterface from "./BallColorInterface";

export default interface GameInterface {
    id: number;
    level: number;
    balls: BallInterface[];
    colors: BallColorInterface[];
    glasses: GlassInterface[];
    steps: number;
    resets: number;
    resetsMax: number;
}