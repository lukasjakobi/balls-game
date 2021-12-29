import GlassInterface from "./GlassInterface";
import BallInterface from "./BallInterface";
import BallColorInterface from "./BallColorInterface";
import MoveInterface from "./MoveInterface";

export default interface GameInterface {
    id: number;
    level: number;
    balls: BallInterface[];
    colors: BallColorInterface[];
    glasses: GlassInterface[];
    moves: MoveInterface[];
    resets: number;
    resetsMax: number;
}