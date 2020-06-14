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
    return <div className = "current-alarm-item" id={props.id}>

                <button 
                    className="button-of-alarm button-delete-alarm" 
                    onClick = {handleDelete} 
                    disabled = {props.isAudioOn} 
                    title="delete">
                </button>

                <p className={(props.activated) ? "alarm-on" : ""  + ((props.isAudioOn) ? "animationAlarmIsRinging" : "")}>{addZero(props.time.hours)} : {addZero(props.time.minutes)}</p>
                
                <button 
                    className={"button-of-alarm " + ((props.activated) ? "button-alarm-on" : "button-alarm-off")} 
                    onClick = {handleActivate} 
                    disabled = {props.isAudioOn}
                    title={(props.activated) ? "turn off alarm" : "turn on alarm"}>
                </button> 

                {props.isAudioOn && <button 
                                        className="button-of-alarm button-mute-alarm" 
                                        onClick = {handleStopClick}
                                        title="mute alarm">
                                    </button>}

            </div>
}

export default AlarmHistoryItem;