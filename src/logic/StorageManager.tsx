import GameInterface from "../interfaces/GameInterface";
import generateGame from "./GameGenerator";

const KEY_LOCAL_STORAGE_GAME_INFORMATION = 'game_info';

export function saveGameInformation(game: GameInterface): void
{
    // write to local storage
    localStorage.setItem(KEY_LOCAL_STORAGE_GAME_INFORMATION, JSON.stringify(game));
}

export function getGameInformation(): GameInterface|null
{
    // write to local storage
    let information = localStorage.getItem(KEY_LOCAL_STORAGE_GAME_INFORMATION);

    if (information === null) {
        return null;
    }

    return JSON.parse(information);
}

export function determineFirstGame(): GameInterface
{
    let localGame = getGameInformation();

    if (localGame !== null) {
        return localGame;
    }

    return generateGame({level: 100})
}