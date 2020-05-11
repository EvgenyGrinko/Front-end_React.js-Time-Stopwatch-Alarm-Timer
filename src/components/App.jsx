import React from "react";
import Time from "./Time";
import Alarm from "./Alarm";
import StopWatch from "./StopWatch";
import Timer from "./Timer";

function App(){
    return <div className="app">
        <Time />
        <Alarm />
        <StopWatch />
        <Timer />
    </div>
}

export default App;