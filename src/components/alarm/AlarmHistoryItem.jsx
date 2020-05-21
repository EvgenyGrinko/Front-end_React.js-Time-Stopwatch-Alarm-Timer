import React from "react";
import addZero from "../addZero";//Function used to add a zero to the passed in "timeValue" if is less then 10.

function AlarmHistoryItem(props){

    function handleActivate(){
        props.setState(props.id);
    };
    function handleDelete(){
        props.onDelete(props.id);
    };

    function handleStopClick(){
        props.onStop(props.id);
    }

    return <div style = {{color: props.activated ? "white" : "black"}}>
        <h1>{addZero(props.time.hours)} : {addZero(props.time.minutes)}</h1>
        <button onClick = {handleActivate} disabled = {props.isAudioOn}>{props.activated ? "off" : "on"}</button>
        <button onClick = {handleDelete} disabled = {props.isAudioOn}>DELETE</button>
        {props.isAudioOn && <button onClick = {handleStopClick}>STOP</button>}
    </div>
}

export default AlarmHistoryItem;