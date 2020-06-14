import React, {useState} from "react";
import {validInput, handleUpDownClick} from "../digitInputFunc";//Functions to handle alarm time.
import addZero from "../addZero";//Function used to add a zero to the passed in "timeValue" if is less then 10.
import DigitInputBlock from "../DigitInputBlock";//Simple component for inputing and changing time for alarm.
import alarmHistory from "./alarmHistory";//An object, where all previous alarms are stored.
import AlarmHistoryItem from "./AlarmHistoryItem";//Component for rendering a single alarm value from "alarmHistory.js"
import { v4 as uuidv4 } from 'uuid';//"uuid" - module which generates unique ID's. "uuidv4" - version 4 (random) of RFC4122 - to create IDs from cryptographically-strong random values
//UUID - "universally unique identifier". RFC 4122 is a standard and it defines a Uniform Resource Name (URN) namespace for UUIDs. A URN is a Uniform Resource Identifier (URI) 
//that uses the "urn" scheme. A UUID presented as a URN appears as follows: urn:uuid:123e4567-e89b-12d3-a456-426655440000
import InitialCurtain from "../InitialCurtain";//Initial component-curtain that hides main functionality
import CloseComponent from "../CloseComponent";//Component used to close currently opened main one

function Alarm(){

    const [currentTime, setCurrentTime] = useState(new Date());
    const [isAlarmSetVisible, setAlarmSetVisible] = useState("none");
    //State of the time that user sets.
    const [time, setTime] = useState({
        hours: 0,
        minutes: 0
    });
    const [handleReset, setReset] = useState(1);//Used in "DigitInputBlock" component to reset its input value if the button "RESET" will be clicked. Can be either "0" - it means 
    //"make reset", or "1" - "don't reset". It used along with time value in the input field of "DigitInputBlock" component as "handleReset && time.value".
    const [isAlarmsOn] = useState(new Map());//The map with [alarm ID, true/false] pairs. Used to indicate, is alarm active or not.
    const [isAudioOn] = useState(new Map());//The map with [alarm ID, true/false] pairs. Used in "AlarmHistoryItem" component to show (if "true") the button "STOP" to stop the music, 
    //when the alarms time is equal to the current.
    const [audioForAlarms] = useState(new Map());//The map with [alarm ID, new Audio()] pairs. Determines which melody is assigned to which alarm. Used to play/pause it respective to ID.
    const [isButtonAddPressed, setButtonAddState] = useState(false);//This state characterize button "button-add": it is "false" if the button is "unpressed" and "true" otherwise. 

    //Function hides initial alarm curtain and initiates refreshing of the current time
    function handleCurtainClick(){
        document.querySelector(".alarm .initial-curtain").style.display = "none";
        setTimeout(function tick(){
            setCurrentTime(new Date());
            setTimeout(tick, 100);
        }, 1000);
    }
    //In the history alarms are stored in the "map" as pairs of [unique ID, object with fields "hours" and "minutes" to represent when alarm should work]
    alarmHistory.historyList.forEach((item, id) => {
        //If the alarm is active and it's time is equal to the current time then inform the user about it:
        if (isAlarmsOn.get(id) && item.hours === currentTime.getHours()  && item.minutes === currentTime.getMinutes() && currentTime.getSeconds() === 0) {
            audioForAlarms.get(id).play();//play the audio file
            isAudioOn.set(id, true);
            isAlarmsOn.set(id, false);
            document.querySelector(".alarm .initial-curtain").classList.add("curtainAnimation");
            const currentAlarmElement = document.getElementById(id);
            currentAlarmElement.querySelector(".current-alarm-item p").classList.add("alarm-ringing");     
        }
    });

    //Function used in "DigitInputBlock" component to control values that user passed in the "input" element
    function inputValidation(event){
        setReset(1);
        validInput(event, setTime);
    }

    //Function used in "DigitInputBlock" component to increase/decrease values of the "input" element
    function onUpDownClick(event, fieldName){
        setReset(1);
        handleUpDownClick(event, fieldName, time, setTime);
    }

    //Function handles click on the "RESET" button. It resets input fileds of the "DigitInputBlock" components to "0".
    function handleResetClick(){
        setTime({
            hours: 0,
            minutes: 0
        });
        setReset(0);
    }

    //Function for adding new alarm to the history and activate it. If the history already has this alarm, "do nothing".
    function handleAddClick(){
        const id = uuidv4();//Generate unique ID for the alarm
        const isNewAlarmAdded = setHistory(id, time);
        if (isNewAlarmAdded) {
            isAlarmsOn.set(id, true);
            isAudioOn.set(id, false);
            audioForAlarms.set(id, new Audio("sounds/alarmSound.mp3"));//Now for every alarm assigned the same melody to be played when it's time will come.
        };
    }
    //Function deletes one alarm from the "alarmHistory.history" map by ID and its associated "states".
    function deleteItem(id){
        alarmHistory.delete(id);
        isAlarmsOn.delete(id);
        isAudioOn.delete(id);
        audioForAlarms.delete(id);
    }
    //Function adds time values to the map "history" in the external "alarmHistory" object which is used to render list of alarms in "div" element with className = "alarm-current-alarms-area".
    function setHistory(id, timeValue){
        const numberOfNotesInHistory = 10;
        //In the map can be added only unique values of time. This examination will be done if the map already has any items.
        if (alarmHistory.historyList.size === 0) {alarmHistory.add(id, timeValue); return true;}
        else {
            let isAnyEqualTime = false;//Variable determines, is there any equal time value for the current one among previous items of the map 
            alarmHistory.historyList.forEach((alarm) => {
                if ((alarm.minutes === timeValue.minutes) && (alarm.hours === timeValue.hours)){
                    isAnyEqualTime = true;
                } 
            });
            if (isAnyEqualTime) return false;//If we have a match between current alarm set and previous in history, don't add it. 
            //If history already has a given number of notes, delete 1 note from the beginning of array and add current time to the end.
            if (alarmHistory.historyList.size === numberOfNotesInHistory) {
                const arrayOfKeys = Array.from(alarmHistory.historyList.keys());//Make an array from iterable object of "historyList" ID's.
                alarmHistory.delete(arrayOfKeys[0]);//From this array we can get ID of the first element from the map and delete it from "alarmHistory".
                alarmHistory.add(id, timeValue);//Now we add new value and keep correct "numberOfNotesInHistory".
                return true;
            }
            else {alarmHistory.add(id, timeValue); return true}
        }      
    }
    //Function used in "AlarmHistoryItem" component to make alarm enabled/disabled by ID.
    function setAlarmState(id){
        if (isAlarmsOn.get(id)) return isAlarmsOn.set(id, false);
        else return isAlarmsOn.set(id, true);
    }
    //Function used in "AlarmHistoryItem" component to stop the alarm's music.
    function stopSound(id){
        isAudioOn.set(id, false);
        audioForAlarms.get(id).pause();
        document.querySelector(".alarm .initial-curtain").classList.remove("curtainAnimation");
        const currentAlarmElement = document.getElementById(id);
        currentAlarmElement.querySelector(".current-alarm-item p").classList.remove("alarm-ringing");     
    }
    
    const alarmItems = [];//An array of all alarms from "alarmHistory.history" map.
    let sortedHistory = alarmHistory.historyList;
    //Make sorting if in the history more than 1 element. Sorting is done before rendering and on the screen alarms will be shown from earliest to latest (according to their time).
    if (alarmHistory.historyList.size > 1){
        sortedHistory = new Map([...sortedHistory.entries()].sort((a, b) => {
            if (a[1].hours > b[1].hours) return 1;
            if (a[1].hours < b[1].hours) return -1;
            if (a[1].hours === b[1].hours){
               if (a[1].minutes > b[1].minutes) return 1;
               if (a[1].minutes < b[1].minutes) return -1;
               else return 0;
            }
        }));
    }
    //Create an array of alarm items from the sorted history map.
    sortedHistory.forEach((item, id) => {
        alarmItems.push(<AlarmHistoryItem 
                            time = {item} 
                            key = {id} 
                            id = {id} 
                            activated = {isAlarmsOn.get(id)} 
                            onDelete = {deleteItem} 
                            setState = {setAlarmState} 
                            onStop = {stopSound}
                            isAudioOn = {isAudioOn.get(id)}
                            />)
    });

    function handleButtonAddClick(){
        const buttonAdd = document.querySelector(".button-add");
        if(isButtonAddPressed){
            setAlarmSetVisible("none");
            setButtonAddState(false);
            buttonAdd.classList.remove("button-pressed");
        } else {
            setAlarmSetVisible("");
            setButtonAddState(true);
            buttonAdd.classList.add("button-pressed");
        }
    }

    function handleButtonCloseSettings(){
        setAlarmSetVisible("none"); 
        setButtonAddState(false);
        document.querySelector(".button-add").classList.remove("button-pressed");
    }

    return <div className="container alarm">

                <InitialCurtain name = "Alarm" handleCurtainClick = {handleCurtainClick}/>
                <div className = "alarm-area-button-close">
                    <CloseComponent name="alarm"/>
                </div>
                <div className = "alarm-area-current-time">
                    <p>{addZero(currentTime.getHours())} : {addZero(currentTime.getMinutes())}</p>
                </div>
                <div className = "alarm-area-button-add-alarm">
                    <button className = "button-add" onClick = {handleButtonAddClick}>+ add alarm</button>
                </div>
                <div className = "alarm-area-settings" style = {{display: isAlarmSetVisible}}>
                    <div className = "alarm-digit-container">
                        <DigitInputBlock 
                            fieldName="hours"
                            fieldValue={handleReset && time.hours} 
                            inputValidation={inputValidation} 
                            onUpDownClick={onUpDownClick} 
                            />
                        <DigitInputBlock 
                            fieldName="minutes" 
                            fieldValue={handleReset && time.minutes} 
                            inputValidation={inputValidation} 
                            onUpDownClick={onUpDownClick} 
                            />
                    </div>
                    <div className = "settings-area-close-alarm">
                        <button className="button-close-settings" onClick = {handleButtonCloseSettings} title="close"></button>
                    </div>
                    <div className="settings-area-button-done">
                        <button className="button-done" onClick = {handleAddClick} title="set alarm">DONE</button>
                    </div>
                    <div className="settings-area-button-reset"> 
                        <button className="button-reset" onClick = {handleResetClick} title="reset"></button>
                    </div>
                </div>
                <div className = "alarm-area-current-alarms">
                    {alarmItems}
                </div>
            </div> 
}

export default Alarm;