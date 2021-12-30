import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Play from "./pages/Play";

function App() {
    return (
        <div className="app w-screen h-screen flex bg-stone-100">
            <Routes>
                <Route path="/" key="homepage" element={<Homepage />}/>
                <Route path="play" key="homepage" element={<Play />}/>
            </Routes>
        </div>
    );
}

export default App;
