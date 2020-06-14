import React, { useState } from "react";
import InitialCurtain from "./InitialCurtain";//Initial component-curtain that hides main functionality
import CloseComponent from "./CloseComponent";//Component used to close currently opened main one
import addZero from "./addZero";//Function used to add a zero to the passed in "timeValue" if is less then 10.

function StopWatch(){

    const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
    const [time, setTime] = useState(new Date(0 + timezoneOffset));
    const [timeAfterStop, setTimeAfterStop] = useState(0);
    const [buttonStartStopName, setButtonStartStopName] = useState("START");
    const [buttonLapResetName, setButtonLapResetName] = useState("");
    const [timerIdButtonStart, setTimerIdButtonStart] = useState();
    const [timerIdButtonStop, setTimerIdButtonStop] = useState();
    const [allLaps, setAllLaps] = useState([]);
    const numberOfLaps = 5;

    function handleStartStopClick(){
        const buttonStartStop = document.querySelector(".stopwatch-area-buttons .button-start-stop");
        const buttonLapReset = document.querySelector(".stopwatch-area-buttons .button-lap-reset");
        const initialCurtain = document.querySelector(".stopwatch .initial-curtain");
        
        
        if (buttonStartStopName === "START") {
            clearTimeout(timerIdButtonStop);
            setButtonStartStopName("STOP");
            initialCurtain.classList.add("curtainAnimation");

            buttonStartStop.classList.remove("button-start");
            buttonStartStop.classList.add("button-stop");

            buttonLapReset.classList.remove("button-reset-disabled");
            buttonLapReset.classList.remove("button-reset");
            if (allLaps.length === numberOfLaps) buttonLapReset.classList.add("button-lap-disabled");
            else buttonLapReset.classList.add("button-lap");

            setButtonLapResetName("LAP");
            let initialTimeStamp;
            (timeAfterStop) ? initialTimeStamp = timeAfterStop : initialTimeStamp = Date.now();
      
            setTimerIdButtonStart(setTimeout(function tick(){
                const currentTimeStamp = Date.now() - initialTimeStamp;
                setTime(new Date(currentTimeStamp + timezoneOffset));
                setTimerIdButtonStart(setTimeout(tick, 10));
            }, 10));
        } 
        if (buttonStartStopName === "STOP"){
            clearTimeout(timerIdButtonStart);
            initialCurtain.classList.remove("curtainAnimation");
            buttonLapReset.classList.remove("button-lap-disabled");
            setTimerIdButtonStop(setTimeout(function tick(){
                setButtonStartStopName("START");
                buttonStartStop.classList.remove("button-stop");    
                buttonStartStop.classList.add("button-start");
                setButtonLapResetName("");
                buttonLapReset.classList.remove("button-lap");
                buttonLapReset.classList.add("button-reset");
    
                setTimeAfterStop(Date.now() - time + timezoneOffset);

            setTimerIdButtonStop(setTimeout(tick, 10));
            }, 10));
        }
    }

    function handleLapResetButtonClick(){
        const areaLaps = document.querySelector(".stopwatch-area-laps");
        const buttonLapReset = document.querySelector(".button-lap-reset");

        if (buttonLapResetName === "LAP") {
            areaLaps.classList.remove("hide-element");
            if (allLaps.length === numberOfLaps) {
                buttonLapReset.classList.remove("button-lap");
                buttonLapReset.classList.add("button-lap-disabled");
                return;
            }else{
                setAllLaps((prevValues) => {
                    if (prevValues.length === 0) return [time];
                    if (prevValues.length === 1) return [prevValues[0], new Date(time - prevValues[0] + timezoneOffset)]
                    else {
                        if (prevValues.length === numberOfLaps-1) {
                            buttonLapReset.classList.remove("button-lap");
                            buttonLapReset.classList.add("button-lap-disabled");
                        }
                        let sumPrevValues = 0;
                        prevValues.forEach((item) => {sumPrevValues += -timezoneOffset + item.getTime()});
                        return [...prevValues, new Date(time.getTime() - sumPrevValues)];
                    };
                });
            }
        }
        if (buttonLapResetName === "") { 
            clearTimeout(timerIdButtonStop);
            areaLaps.classList.add("hide-element");
            setTime(new Date(0 + timezoneOffset));
            setTimeAfterStop(0);
            setAllLaps([]);
            buttonLapReset.classList.remove("button-lap-disabled");
            buttonLapReset.classList.remove("button-lap");
        }
    }

    function createTimeValue(time, index){
        const hoursValue = time.getHours();
        const timeValue = addZero(time.getMinutes()) + " : " + addZero(time.getSeconds()) + " : " + addZero(Math.trunc(time.getMilliseconds()/10));
        if (hoursValue !== 0) timeValue = addZero(hoursValue) + " : " + timeValue;
        if (index === 0) return (<div>{timeValue}</div>);
        else return (<div>{"+" + timeValue}</div>);
    }

    return <div className="container stopwatch">
                <InitialCurtain name = "Stopwatch" handleCurtainClick = {false}/>
                <div className = "stopwatch-area-button-close">
                    <CloseComponent name="stopwatch"/>
                </div>
                <div className = "stopwatch-area-time"> {createTimeValue(time, 0)}</div>
                <div className = "stopwatch-area-buttons">
                    <button className = "button-start-stop button-start" onClick = {handleStartStopClick}>{buttonStartStopName}</button>
                    <button 
                        className = "button-lap-reset button-reset-disabled"
                        onClick = {handleLapResetButtonClick} 
                        disabled = {((time.getHours() || time.getMinutes() || time.getSeconds() || time.getMilliseconds()) === 0) ? true : false}
                        title = {(buttonLapResetName === "LAP") ? "new lap" : "reset"}
                            >{buttonLapResetName}
                    </button>
                </div>
                <div className = "stopwatch-area-laps hide-element">   
                    <div className="laps-title">Laps:</div>
                    <div className="laps-items">
                        {allLaps.map((item, index) => {return createTimeValue(item, index)})}
                    </div>                   
                </div>
            </div>
}

export default StopWatch;