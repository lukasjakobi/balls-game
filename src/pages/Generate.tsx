import {useState} from "react";
import GameInterface from "../interfaces/GameInterface";
import {generateGame} from "../logic/GameGenerator";
import ShareInterface from "../interfaces/ShareInterface";
import {generateUUID} from "../logic/UUIDGenerator";
import {useNavigate} from "react-router-dom";

const DEFAULT_GLASSES = 7;
const DEFAULT_EMPTY_GLASSES = 2;

function Generate() {
    let navigate = useNavigate();

    const [glasses, setGlasses] = useState<number>(DEFAULT_GLASSES);
    const [emptyGlasses, setEmptyGlasses] = useState<number>(DEFAULT_EMPTY_GLASSES);

    return (
        <section id="homepage" className="flex w-screen h-screen">
            <div className="flex flex-col w-full h-4/5 my-auto">
                <div className="brand">Balls Game</div>
                <div className="level-wr">
                    <span className="level">Generate Level</span>
                </div>
                <div className="generate">
                    <div className="input">
                        <label htmlFor="glasses">Glasses (With Empty)</label>
                        <input
                            type="number"
                            id="glasses"
                            defaultValue={DEFAULT_GLASSES}
                            value={glasses}
                            max={15}
                            onChange={(event) => setGlasses(parseInt(event.target.value))}
                        />
                    </div>
                    <div className="input">
                        <label htmlFor="empty_glasses">Empty Glasses</label>
                        <input
                            type="number"
                            id="empty_glasses"
                            defaultValue={DEFAULT_EMPTY_GLASSES}
                            value={emptyGlasses}
                            onChange={(event) => setEmptyGlasses(parseInt(event.target.value))}
                        />
                    </div>
                    <div className="button-cta" onClick={() => {
                        let game: GameInterface = generateGame(glasses, emptyGlasses);

                        let share: ShareInterface = {
                            id: generateUUID(),
                            name: 'Generated Level',
                            glasses: game.glasses
                        }

                        let json = JSON.stringify(share);
                        let hash = btoa(json);

                        navigate('/share/' + hash);
                    }}>Generate</div>
                </div>
            </div>
        </section>
    )
}

export default Generate;