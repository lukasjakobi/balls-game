import GameInterface from "../interfaces/GameInterface";
import Glass from "./Glass";

export default function Game(props: GameInterface) {
    return (
      <div className="game w-full h-full">
          { props.glasses && props.glasses.map(glass => (
              <Glass
                  key={glass.id}
                  id={glass.id}
                  balls={glass.balls}
              />
          ))}
      </div>
    );
}