import React from 'react';
import './App.css';
import Game from "./components/Game";

function App() {
    return (
        <div className="app w-screen h-screen flex bg-yellow-50">
            <div className="m-auto">
                <Game />
            </div>
        </div>
    );
}

export default App;
