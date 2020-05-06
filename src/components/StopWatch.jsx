import React, { useState } from "react";

function StopWatch(){
    // const [time, setTime] = useState({
    //     hours: 0,
    //     minutes: 0,
    //     seconds: 0,
    //     miliseconds: 0
    // });
    const [time, setTime] = useState(0);
    const [buttonName, setButtonName] = useState("GO");
    const [timerId, setTimerId] = useState();
    

    function handleClick(){
        
        // let timeStamp = 0;
        if (buttonName === "GO") {
            setButtonName("STOP");
            //The timer should have format: 00:00:00:00 (hours : minutes : seconds : miliseconds)
            //Hours shouldn't be shown while it's value is zero
            const initialTimeStamp = Date.now();
            setTimerId(setTimeout(function tick(){
                // timeStamp++;
                // let timeInSeconds = Math.floor(timeStamp/100);
                // let milisec = Math.floor((timeStamp/100 - timeInSeconds)*100);
                // let hours = Math.floor(timeInSeconds/3600);
                // let minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
                // let seconds = Math.floor((timeInSeconds - hours * 3600 - minutes * 60));
                // setTime({
                //     hours: hours,
                //     minutes: minutes,
                //     seconds: seconds,
                //     miliseconds: milisec
                // });

                setTime(Date.now() - initialTimeStamp); 
                setTimerId(setTimeout(tick, 10));
            }, 10));
        } 
        if (buttonName === "STOP"){
            clearTimeout(timerId);
            setButtonName("GO");
        }
    }

    function handleResetClick(){
        setTime(0);
    }
    return <div className="stopwatch">
    {/* <h1>{time.hours || "00"} : {time.minutes || "00"} : {time.seconds || "00"} : {time.miliseconds || "00"}</h1> */}
    <h1>{new Date(time-10800000).toLocaleTimeString()}:{new Date(time-10800000).getMilliseconds()}</h1>
    <button onClick={handleClick}>{buttonName}</button>
    <button onClick={handleResetClick}>RESET</button>
    </div>}

export default StopWatch;