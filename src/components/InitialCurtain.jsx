import React from "react";

//This component hides functionality of one of four main components (Time, Alarm, Stopwatch, Timer);
function InitialCurtain(props) {

    function handleCurtainClick(){
        if(props.handleCurtainClick) return props.handleCurtainClick();
        else {
            document.querySelector("." + props.name.toLowerCase() + " .initial-curtain").style.display = "none";
        }
    }

    return <div className = "initial-curtain" onClick = {handleCurtainClick}>
                <div>
                    <h2>{props.name.toUpperCase()}</h2>
                </div>
            </div>
}

export default InitialCurtain;