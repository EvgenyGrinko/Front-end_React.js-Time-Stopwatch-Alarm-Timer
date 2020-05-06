import React, {useState} from "react";

function Timer(){

    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [buttonName, setButtonName] = useState("Start");

    const [timerId, setTimerId] = useState();

    function handleInputChange(event){
        const {name, value} = event.target;
        setTime(function(prevValue) {
            return {
                ...prevValue,
                [name] : Number(value)
            }
        })
    }

    function handleUpDownClick(event){
        const {name, value} = event.target;
        if (name === "up") {
            setTime((prevValue) => {
                return {...prevValue, 
                    [value]: ++prevValue[value]}
            });
        } else {
            setTime((prevValue) => {
                return {...prevValue, 
                    [value]: --prevValue[value]}
            });
        }
        event.preventDefault();
    }

    function handleStartStopClick(event){
        let initialTime = time.hours * 3600 + time.minutes * 60 + time.seconds;
        if (initialTime === 0) {
            event.preventDefault();
            return;
        }
        if (buttonName === "Start") {
            
            console.log(time);
            setTimerId(setTimeout(function tick(){
                if (initialTime === 0){
                    clearTimeout(timerId);
                    setButtonName("Start");
                    return;
                }
                initialTime--;
                setTime({
                    hours: Math.floor(initialTime/3600),
                    minutes: Math.floor((initialTime-Math.floor(initialTime/3600)*3600)/60),
                    seconds: initialTime - Math.floor(initialTime/3600)*3600 - Math.floor((initialTime-Math.floor(initialTime/3600)*3600)/60)*60
                });
                
                setTimerId(setTimeout(tick, 1000));
            },1000));
            setButtonName("Stop")
        } else {
            clearTimeout(timerId);
            setButtonName("Start");
        } 
        
        event.preventDefault();
    }


    return <div className="timer">
        <form>
            <div name="hours" className = "hours">
                <input name="hours" value = {time.hours} onChange={handleInputChange} placeholder="00"></input>
                <button name="up" value="hours" onClick = {handleUpDownClick}>up</button>
                <button name="down" value="hours" onClick = {handleUpDownClick}>down</button>
            </div>
            <div name="minutes" className = "minutes">
                <input name="minutes" value = {time.minutes} onChange={handleInputChange} placeholder="00"></input>
                <button name="up" value="minutes" onClick = {handleUpDownClick}>up</button>
                <button name="down" value="minutes" onClick = {handleUpDownClick}>down</button>
            </div>
            <div name="seconds" className = "seconds">
                <input name="seconds" value = {time.seconds} onChange={handleInputChange} placeholder="00"></input>
                <button name="up" value="seconds" onClick = {handleUpDownClick}>up</button>
                <button name="down" value="seconds" onClick = {handleUpDownClick}>down</button>
            </div>
            <button onClick={handleStartStopClick}>{buttonName}</button>
        </form>
        <h1>
            {time.hours||"00"} : {time.minutes||"00"} : {time.seconds||"00"}
        </h1>
    </div>}

export default Timer;