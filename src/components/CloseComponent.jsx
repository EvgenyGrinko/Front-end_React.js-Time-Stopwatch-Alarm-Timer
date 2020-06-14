import React from "react";

//Component used to close current main one (Time, Alarm< Stopwatch or Timer), when it's shown.
function CloseComponent(props){
    function handleClick(){
        document.querySelector("." + props.name + " .initial-curtain").style.display = "";
    }
    return <div className="closing">
        <button className="close-button" title="close" onClick = {handleClick}></button>
    </div>
}

export default CloseComponent;