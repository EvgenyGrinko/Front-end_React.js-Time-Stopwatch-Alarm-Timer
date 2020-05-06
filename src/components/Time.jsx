import React, { useState } from "react";

function Time(){

    const [time, setTime] = useState("");
    const [buttonName, setButtonName] = useState("Get Time");
    const [timerId, setTimerId] = useState();

    //  function getTime(){
    //      setTime(new Date().toLocaleTimeString());
    //      setInterval(getTime, 1000);
    //  }

    // function getTime(){
    //     let timerId = setTimeout(function tick(){
    //         setTime(new Date().toLocaleTimeString());
    //         timerId = setTimeout(tick, 1000);
    //     }, 1000);
    // }
    
    
    function getTime(){
        if (buttonName === "Get Time") {
            setTimerId(setTimeout(function tick(){
                setTime(new Date().toLocaleTimeString());
                setTimerId(setTimeout(tick, 1000));
            }, 1000));
            setButtonName("Stop Time");
        } else {
            clearTimeout(timerId);
            setButtonName("Get Time");
        }
    }
    

    return <div className="time">
        <h1>{time}</h1>
        <button onClick={getTime}>{buttonName}</button>
    </div>
}

export default Time;