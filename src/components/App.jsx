import React from "react";
import Time from "./time/Time";
import Alarm from "./alarm/Alarm";
import StopWatch from "./stopwatch/StopWatch";
import Timer from "./timer/Timer";

function App(){
    return <div className="app">
        <Time />
        <Alarm />
        <StopWatch />
        <Timer />
    </div>
}

export default App;