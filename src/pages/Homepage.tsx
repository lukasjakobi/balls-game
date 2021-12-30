import {getGameInformation} from "../logic/StorageManager";
import {Link} from "react-router-dom";

function Homepage() {
    let information = getGameInformation();

    return (
        <section id="homepage" className="flex w-screen h-screen">
            <div className="flex flex-col w-full h-4/5 my-auto">
                <div className="brand">Balls Game</div>
                { information && information.level && (
                    <div className="level-wr">
                        <span className="level">Level {information.level}</span>
                    </div>
                )}
                <Link to="play" className="button-cta">PLAY</Link>
            </div>
        </section>
    )
}

export default Homepage;