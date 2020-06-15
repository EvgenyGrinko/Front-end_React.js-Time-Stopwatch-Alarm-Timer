import React, {useState} from "react";
import DigitInputBlock from "../DigitInputBlock";
import HistoryList from "./HistoryList";
import history from "./history";//An object with array of unique values of time that were previously used for timer and a function to add it.
import InitialCurtain from "../InitialCurtain";//Initial component-curtain that hides main 
import CloseComponent from "../CloseComponent";//Component used to close currently opened main one

function Timer(){
    //State of the time that user sets.
    const [time, setTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    //State of the timer. Will be changed during the countdown.
    const [timerState, setTimerState] = useState({
        timerHours: time.hours,
        timerMinutes: time.minutes,
        timerSeconds: time.seconds
    });
    const [isDisabled, setDisabled] = useState(false);//To make enable/disable input fields and Up/Down buttons.
    const [isResetDisabled, setResetDisabled] = useState(false);//To make enable/disable the "RESET" button.
    const [handleReset, setReset] = useState(1);//Used in "DigitInputBlock" component to reset its input value if the button "RESET" will be clicked.
    const [buttonName, setButtonName] = useState("START");//The button may has 3 states: "START" - to initiate timer; "STOP" - to stop countdown; "RESUME" - to continue it.
    const [timerId, setTimerId] = useState();
    const [remainingTime, setRemainingTime] = useState(0);//Saves the remaining for the timer time and used to resume it if the button "STOP" would be clicked.
    const [isHistoryVisible, setHistoryVisibility] = useState("none");//Controls visibility of the "HistoryList" component.
    const [isHistoryActive, setHistoryActivity] = useState(true);//This state characterize button "history-button": it is "true" if the button is "unpressed" and "false" otherwise. 
    const [timerAudio, setTimerAudio] = useState(new Audio("sounds/timerSound.mp3"));

    //Function to handle timer state. It invokes every time, when user clicks on "START"/"STOP"/"RESUME" buttons.
    //This is the first realization of timer functionality. The idea: according to the time, that user set, the
    //time gap in seconds calculated; every second this time gap decreases by 1 until its value will be 0. Timer state
    //(the remain time) is calculated every second from the value of time gap
    function handleStartStopClick(event){
        const buttonStartStop = document.querySelector(".timer-start-stop-button-area .start-stop-button");
        const initialCurtain = document.querySelector(".timer .initial-curtain");
        setDisabled(true);
        setResetDisabled(true);
        let timeGap = remainingTime;//The "timeGap" is the rest of the time that timer should go. To resume timer countdown it assigned to the last timer state.
        //At the beginning, when user clicks on button "START", make initial settings
        if (buttonName === "START"){
            setTimerState({
                timerHours: time.hours,
                timerMinutes: time.minutes,
                timerSeconds: time.seconds
            }); 

            setHistory(time);//Add current time value in the timer history if it hasn't been used before.

            timeGap = time.hours * 3600 + time.minutes * 60 + time.seconds;//convert time to seconds
            setRemainingTime(timeGap);
        }
        //"Do nothing" if the user didn't set a time.
        if (timeGap === 0) {
            setDisabled(false);
            setResetDisabled(false);
            if (timerAudio.loop === true){
                timerAudio.pause();
                setTimerAudio(new Audio("sounds/timerSound.mp3"));
                handleStartStopButtonStyle();
                setButtonName("START");
                setDisabled(false);
                setResetDisabled(false);
                handleResetButtonStyle();
                changeHistoryButtonStyle("enabled");
                buttonStartStop.classList.remove("timerIsOverAnimation");
                initialCurtain.classList.remove("curtainAnimation");
            }
            return;
        }
        //If he did set, the countdown begins:
        if (buttonName === "START" || buttonName === "RESUME") {

            setTimerId(setTimeout(function tick(){
                //If the timer will finish countdown, inform the user.
                if (timeGap === 0){
                    timerAudio.play();
                    timerAudio.loop = true;
                    clearTimeout(timerId);
                    buttonStartStop.classList.add("timerIsOverAnimation");
                    initialCurtain.classList.add("curtainAnimation");
                    return;
                }

                --timeGap;
                
                setTimerState({
                    timerHours: Math.floor(timeGap/3600),
                    timerMinutes: Math.floor((timeGap-Math.floor(timeGap/3600)*3600)/60),
                    timerSeconds: timeGap - Math.floor(timeGap/3600)*3600 - Math.floor((timeGap-Math.floor(timeGap/3600)*3600)/60)*60
                });
                setRemainingTime(timeGap);
                setTimerId(setTimeout(tick, 1000));

            },1000));

            setButtonName("STOP");
            handleStartStopButtonStyle();
            handleResetButtonStyle();
            changeHistoryButtonStyle("disabled");
        } else {
            clearTimeout(timerId);
            setResetDisabled(false);//The "RESET" button is enable if the button "STOP" was clicked
            handleStartStopButtonStyle();
            handleResetButtonStyle();
            setButtonName("RESUME");
        } 
    }
//!!!!!!!!!!This block needs to be corrected\\\\\\\\\\\\\\\\
    // //Function to handle timer state. It invokes every time, when user clicks on "START"/"STOP"/"RESUME" buttons.
    // //This is the second realization of timer functionality. The idea: according to the time, that user set, the
    // //"Date" object created with that initial time; every second from this "Date" object (from object timestamp)
    // //subtracted 1000ms, until its Hours, Minutes and Seconds value will be 0. 
    // function handleStartStopClick(event){

    //     setDisabled(true);
    //     setResetDisabled(true);
    //     let timerDate = remainingTime;//The "timerDate" object contains current timer value. To resume timer countdown it assigned to the last timer state.
    //     const timeGapInMs = (time.hours * 3600 + time.minutes * 60 + time.seconds)*1000;//The total time that timer should pass (in milliseconds)
        
    //     //At the beginning, when user clicks on button "START", make initial settings
    //     if (buttonName === "START"){
    //         setTimerState({
    //             timerHours: time.hours,
    //             timerMinutes: time.minutes,
    //             timerSeconds: time.seconds
    //         }); 

    //         setHistory(time);//Add current time value in the timer history if it hasn't been used before.

    //         timerDate = new Date();
    //         timerDate.setHours(time.hours, time.minutes, time.seconds, 0);
    //         setRemainingTime(timerDate);
    //     }
    //     //"Do nothing" if the user didn't set a time.
    //      if (timeGapInMs === 0) {
    //         setDisabled(false);
    //         setResetDisabled(false);
    //         return;
    //     }
    //     //If he did set, the countdown begins:
    //     if (buttonName === "START" || buttonName === "RESUME") {

    //         setTimerId(setTimeout(function tick(){
    //             setTimerState({
    //                 timerHours: timerDate.getHours(), 
    //                 timerMinutes: timerDate.getMinutes(), 
    //                 timerSeconds: timerDate.getSeconds()
    //             });

    //             if (timerDate.getHours() === 0 && timerDate.getMinutes() === 0 && timerDate.getSeconds() === 0){
    //                 clearTimeout(timerId);
    //                 setButtonName("START");
    //                 setDisabled(false);
    //                 setResetDisabled(false);
    //                 alert("The time is over");
    //                 return;
    //             }

    //             timerDate.setTime(timerDate.getTime() - 1000);
    //             setRemainingTime(timerDate);
    //             setTimerId(setTimeout(tick, 1000));
                
    //         }, 1000));

    //         setButtonName("STOP");

    //     } else {
    //         clearTimeout(timerId);
    //         setResetDisabled(false);//The "RESET" button is enable if the button "STOP" was clicked
    //         setButtonName("RESUME");
    //     } 
    // }

    //Function adds time values to the array "list" in the external "history" object which is used to render list of times in "HistoryList" component
    function setHistory(timeValue){
        const numberOfNotesInHistory = 5;
        //In the array can be added only unique values of time. This examination will be done if the array already has any items.
        if (timeValue.hours === 0 && timeValue.minutes === 0 && timeValue.seconds === 0) return;//"Do nothing" if time set is "00:00:00".
        if (history.historyList.length === 0) return history.add(timeValue);
        else {
            let isAnyEqualTime = false;//Variable determines, is there any equal time value for the current one among previous items of the array 
            history.historyList.forEach((item) => {
                if ((item.seconds === timeValue.seconds) && (item.minutes === timeValue.minutes) && (item.hours === timeValue.hours)){
                    isAnyEqualTime = true;
                } 
            });
            if (isAnyEqualTime) return;//If we have a match between current timer set and previous in history, don't add it. 
            //If history already has a given number of notes, delete 1 note from the beginning of array and add current time to the end.
            if (history.historyList.length === numberOfNotesInHistory) {
                history.list.shift();
                history.add(timeValue);
                return;
            }
            else return history.add(timeValue);
        }      
    }
    
    //Function handles click on the "RESET" button. It resets all fileds to "0".
    function resetState(event){
        setTime({
            hours: 0,
            minutes: 0,
            seconds: 0
        });
        setReset(0);//resets to "0" values of input elements
        setTimerState({timerHours: 0, timerMinutes: 0, timerSeconds: 0});
        setButtonName("START");
        setDisabled(false);//Enables input fields and Up/Down buttons.
        changeHistoryButtonStyle("enabled");
    }

    function handleResetButtonStyle(){
        const resetButton = document.querySelector(".timer-reset-button-area .button-reset");
        resetButton.classList.toggle("enabled");
        resetButton.classList.toggle("disabled");
    }

    function handleStartStopButtonStyle(){
        const startStopButton = document.querySelector(".timer-start-stop-button-area .start-stop-button");
        startStopButton.classList.toggle("button-start");
        startStopButton.classList.toggle("button-stop");
    }

    //Function used to add a zero if the "timeValue" is less then 10. It needs to make timer countdown visually match the format 00:00:00.
    function addZero(timeValue){
        if (timeValue < 10) return "0" + timeValue;
        else return timeValue;
    }

    //-------------------Functions for "HistoryList" component-------------------//
    
    //Function makes "HistoryList" component visible and manipulate with the inline "style" of the button "history-button"
    function handleHistoryClick(){
        const historyButton = document.querySelector(".timer-history-button-area .history-button");
        
        if (isHistoryActive) {
            setHistoryVisibility("");
            historyButton.classList.add("history-button-pressed");//Class "history-button-pressed" makes button "historyButton" looks like "pressed".
            setHistoryActivity(false);
        } else {
            setHistoryVisibility("none");
            if (historyButton.classList.contains("history-button-pressed")) historyButton.classList.remove("history-button-pressed");//Return button "historyButton" to the "unpressed" state.
            setHistoryActivity(true);
        }
    }

    
    //Function hides "HistoryList" component after click on "Cancel" button
    function handleCancelClick(){
        setHistoryVisibility("none");
        const historyButton = document.querySelector(".timer-history-button-area .history-button");
        if (historyButton.classList.contains("history-button-pressed")) historyButton.classList.remove("history-button-pressed");//Return button "historyButton" to the "unpressed" state.
        setHistoryActivity(true);
    }
    //Function calls when the user clicks on one of the items, sets timer state with this value and hides "HistoryList" component 
    function historyItemClick(id){
        setReset(1);
        //If the user clicks on any item of the history list, a deep copy of the history list is used to set time instead of direct using of history list.
        setTimerState({
            timerHours: history.historyList[id].hours,
            timerMinutes: history.historyList[id].minutes,
            timerSeconds: history.historyList[id].seconds});
        setTime(history.historyList[id]);
        setHistoryVisibility("none");
        const historyButton = document.querySelector(".timer-history-button-area .history-button");
        if (historyButton.classList.contains("history-button-pressed")) historyButton.classList.remove("history-button-pressed");//Return button "historyButton" to the "unpressed" state.
        setHistoryActivity(true);
    }

    //Function calls to adjust styles of button "history-button" and component "HistoryList" depending from the needed button state
    function changeHistoryButtonStyle(buttonState){
        const historyButton = document.querySelector(".timer-history-button-area .history-button");
        setHistoryVisibility("none");//Hide component "HistoryList" if it was visible
        setHistoryActivity(true);//Return button "history-button" to the "unpressed" state if it was "pressed".
        //If the timer has finished countdown or if the button "Reset" was pressed (i.e. the timer resets its current time) revert back the style of the button "history-button" to the initial.
        if(buttonState === "enabled") {
            if(historyButton.classList.contains("button-disabled")) historyButton.classList.remove("button-disabled");
            historyButton.classList.add("button-enabled");//Class "button-enabled" adds to the button "history-button" "hover" effect.
        }
        //In the other cases (timer is stopped, resumed (the button "STOP" or "RESUME" was pressed) or) make button "history-button" disabled.
        if(buttonState === "disabled"){
            historyButton.classList.add("button-disabled");//Class "button-disabled" changes the "background" and "cursor" properties of the button "history-button"
            historyButton.classList.remove("button-enabled");
        }
        if (historyButton.classList.contains("history-button-pressed")) historyButton.classList.remove("history-button-pressed");//Return button "historyButton" to the "unpressed" state.
    }

    //-------------------Functions for "DigitInputBlock" component-------------------//

    //Function passed to "DigitInputBlock" component. It controls the values that user can type to the input element.
    //"DigitInputBlock" is used to set independant values of time: "hours", "minutes" and "seconds"
    function validInput(event){
        setReset(1);
        const inputValue = Number(event.target.value);//the value from "input" element should be of type Number
        const inputName = event.target.name;//the name of the"input" element
        
        //If the user typed a number (no letters or signes), than make subsequent check.
        if (!isNaN(inputValue)){
            //If the user types in the input field with name "hours":
            if (inputName === "hours"){
                //and if he types a number in the appropriate range ("hours" can be in the range of 0...23) then set the "hours" value of current time.
                if (inputValue >= 0 && inputValue <= 23) {
                    setTime(function(prevValue){
                        return {
                            ...prevValue,
                            [inputName] : inputValue
                        }
                    });
                }
            //If the user types in the input field with name "minutes" or "seconds"
            }else {
                //and if he types a number in the appropriate range ("minutes" or "seconds" can be 0...59) then set the "minutes"/"seconds" value of current time.
                if (inputValue >= 0 && inputValue <= 59) {
                    setTime(function(prevValue){
                        return {
                            ...prevValue,
                            [inputName] : inputValue
                        }
                    });
                }
            }
        //If the user inputs not a number, set the value of current time ("hours", "minutes" or "seconds") to "0".
        } else {
            setTime(function(prevValue){
                return {
                    ...prevValue,
                    [inputName] : 0
                }
            });
        }
    }

    //Function passed to "DigitInputBlock" component. It allows to increase/decrease by 1 value "hours", "minutes" or "seconds" of time in the input element.
    function handleUpDownClick(event, fieldName){
        setReset(1);
        const name = event.target.name; //button name ("up" or "down")
        
        //The input value can't be "undefiend". If it is, assign current input field to "0". 
        if (typeof(time[fieldName]) === "undefined") {
            setTime(function(prevValue) {
                return {
                    ...prevValue,
                    [fieldName] : 0
                }
            });
        }
        //If the user clicks on buttons "Up"/"Down" which belong to the input field with name "hours":
        if (fieldName === "hours") {
            setInputUpDownBoundary(name, 23, fieldName);

        //If the user clicks on buttons "Up"/"Down" which belong to the input field with name "minutes" or "seconds":
        } else {
            setInputUpDownBoundary(name, 59, fieldName);
        }     
    }

    //This function receives the name of the button, that was clicked ("up" or "down"), the boundary value and the input element name.
    //It either increases or decreases the "value" of "input" element. The "boundaryValue" limits max values for "hours" (23),
    //"minutes" (59) and "seconds" (59). For example, if User wants to increase "hours" field when it's previous value
    //was "23", he clicks on "up" arrow-button, and this function will set it's value to "0", because Hours can vary from 0 to 23. 
    //(Minutes and seconds - from 0 to 59). Time format from 00:00:00 to 23:59:59.
    function setInputUpDownBoundary(buttonName, boundaryValue, fieldName){
        setTime(function(prevValue) {
            //If the button name is "up" then increase value of the time "fieldName" according to its range:
            if (buttonName === "up"){
                //If current value of time "filedName" is equal to boundary value (23) assign it to "0"
                if (prevValue[fieldName] === boundaryValue) return {...prevValue, [fieldName] : 0}
                //In any other case - increase it.
                else return {...prevValue, [fieldName] : ++prevValue[fieldName]};

            //If the button name is "down" then decrease value of the time "fieldName" according to its range:
            } else {
                //If current value of time "filedName" is equal 0 assign it to the boundary value (as negative numbers are not allowed).
                if (prevValue[fieldName] === 0) return {...prevValue, [fieldName] : boundaryValue};
                //In any other case - decrease it.
                else return {...prevValue, [fieldName] : --prevValue[fieldName]};
            }
        });
    }

    return <div className="container timer">
                <InitialCurtain name = "Timer" handleCurtainClick = {false}/>
                <div className = "timer-close-button-area">
                    <CloseComponent name="timer"/>
                </div>
                <div className = "timer-digit-container">
                    <DigitInputBlock 
                        fieldName="hours" 
                        fieldValue={handleReset && time.hours} 
                        inputValidation={validInput} 
                        onUpDownClick={handleUpDownClick}
                        isDisabled={isDisabled}
                        />
                    <DigitInputBlock 
                        fieldName="minutes" 
                        fieldValue={handleReset && time.minutes}
                        inputValidation={validInput} 
                        onUpDownClick={handleUpDownClick}
                        isDisabled={isDisabled}
                        />
                    <DigitInputBlock 
                        fieldName="seconds" 
                        fieldValue={handleReset && time.seconds} 
                        inputValidation={validInput} 
                        onUpDownClick={handleUpDownClick}
                        isDisabled={isDisabled}
                        />
                </div>
                <div className = "timer-start-stop-button-area">
                    <button name="start" className="start-stop-button button-start" onClick = {handleStartStopClick}>{buttonName}</button>
                </div>
                <div className = "timer-reset-button-area">
                    <button name="reset" className="button-reset enabled" title="reset" onClick = {resetState} disabled = {isResetDisabled}></button>
                </div>
                <div className = "timer-history-button-area">
                    <button name="history" className="history-button button-enabled" title="history" onClick = {handleHistoryClick} disabled = {isDisabled}></button>
                </div>
                <div className = "timer-countdown-area">
                    <p className="countdown-component">{addZero(timerState.timerHours)} : {addZero(timerState.timerMinutes)} : {addZero(timerState.timerSeconds)}</p>
                </div>
                <div className = "timer-history-list-area">
            <HistoryList 
                history = {history.historyList} 
                display = {isHistoryVisible} 
                onItemClick = {historyItemClick} 
                onCancelClick = {handleCancelClick}
                />
        </div> 
            </div>
}

export default Timer;