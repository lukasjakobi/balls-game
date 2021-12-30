import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Play from "./pages/Play";
import Share from "./pages/Share";
import Generate from "./pages/Generate";

function App() {
    return (
        <div className="app w-screen h-full flex bg-stone-100">
            <Routes>
                <Route path="/" key="homepage" element={<Homepage />}/>
                <Route path="play" key="play" element={<Play />}/>
                <Route path="generate" key="generate" element={<Generate />}/>
                <Route path="share/:hash" key="share" element={<Share />}/>
            </Routes>
        </div>
    );
}

export default App;
