import BallInterface from "../interfaces/BallInterface";

export default function Ball(props: BallInterface) {
    return (
      <div
          className="ball"
          style={{ backgroundColor: props.color.hex }}
      />
    );
}