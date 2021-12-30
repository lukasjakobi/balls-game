import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Play from "./pages/Play";
import Share from "./pages/Share";

function App() {
    return (
        <div className="app w-screen h-screen flex bg-stone-100">
            <Routes>
                <Route path="/" key="homepage" element={<Homepage />}/>
                <Route path="play" key="homepage" element={<Play />}/>
                <Route path="share/:hash" key="homepage" element={<Share />}/>
            </Routes>
        </div>
    );
}

export default App;
