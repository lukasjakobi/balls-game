import BallInterface from "./BallInterface";
import GlassInterface from "./GlassInterface";

export default interface MoveInterface {
    ball: BallInterface;
    from: GlassInterface;
    to: GlassInterface;
}