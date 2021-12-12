import Ball from "./Ball";
import GlassInterface from "../interfaces/GlassInterface";

export default function Glass(props: GlassInterface) {
    return (
        <div className="glass">
            { props.balls && props.balls.map(ball => (
                <Ball
                    key={ball.id}
                    color={ball.color}
                    id={ball.id}
                />
            ))}
        </div>
    );
}