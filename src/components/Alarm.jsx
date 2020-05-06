import React, {useState} from "react";

function Alarm(){
    const [time, setTime] = useState({});

    const timerHours = document.getElementById("hours");
    const timerMinutes = document.getElementById("minutes");
    const timerSeconds = document.getElementById("seconds");

    function handleChange(event){
        const {name, value} = event.target;
        
        setTime(function(prevValue) {
            return {
                ...prevValue,
                [name] : Number(value)
            }
        }); 
    }
    function handleClick(event){
        let timerId;
        if (event.target.name === "set") {

            timerHours.disabled = true;
            timerMinutes.disabled = true;
            timerSeconds.disabled = true;

            timerId = setInterval(function tick(){
                let now = new Date();
                let hours = now.getHours();
                let minutes = now.getMinutes();
                let seconds = now.getSeconds();
            
                if ((time.hours === hours) && (time.minutes === minutes) && (time.seconds === seconds)){
                    document.querySelector(".header").style.color = "purple";
                    clearInterval(timerId);
                    timerHours.disabled = false;
                    timerMinutes.disabled = false;
                    timerSeconds.disabled = false;
                }
            }, 1000);
        } else {
            clearInterval(timerId);
            timerHours.disabled = false;
            timerMinutes.disabled = false;
            timerSeconds.disabled = false;
            document.querySelector(".header").style.color = "";
        }
    }
    return <div className="alarm">
        <input type="number" name = "hours" id = "hours" onChange={handleChange} value={time.hours} placeholder = "00"></input>
        <input type="number" name = "minutes" id = "minutes" onChange={handleChange} value={time.minutes} placeholder = "00"></input>
        <input type="number" name = "seconds" id = "seconds" onChange={handleChange} value={time.seconds} placeholder = "00"></input>
        <button name="set" onClick={handleClick}>SET</button>
        <button name="reset" onClick={handleClick}>RESET</button>
        <h1 className = "header" style = {{color: "black"}}>SET?</h1>
    </div>
}

export default Alarm;