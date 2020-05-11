import React, {useState} from "react";
import DigitInputBlock from "./DigitInputBlock";

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
    const [buttonName, setButtonName] = useState("Start");//The button may has 3 states: "Start" - to initiate timer; "Pause" - to pause countdown; "Resume" - to continue it.
    const [timerId, setTimerId] = useState();
    const [remainingTime, setRemainingTime] = useState(0);//Saves the remaining for the timer time and used to resume it if the button "Pause" would be clicked.

    //Function to handle timer state. It invokes every time, when user clicks on "Start"/"Pause"/"Resume" buttons.
    //This is the first realization of timer functionality. The idea: according to the time, that user set, the
    //time gap in seconds calculated; every second this time gap decreases by 1 until its value will be 0. Timer state
    //(the remain time) is calculated every second from the value of time gap
    function handleStartStopClick(event){

        setDisabled(true);
        setResetDisabled(true);
        let timeGap = remainingTime;//The "timeGap" is the rest of the time that timer should go. To resume timer countdown it assigned to the last timer state.
        //At the beginning, when user clicks on button "Start", make initial settings
        if (buttonName === "Start"){
            setTimerState({
                timerHours: time.hours,
                timerMinutes: time.minutes,
                timerSeconds: time.seconds
            }); 
            
            timeGap = time.hours * 3600 + time.minutes * 60 + time.seconds;//convert time to seconds
            setRemainingTime(timeGap);
        }
        //"Do nothing" if the user didn't set a time.
        if (timeGap === 0) {
            setDisabled(false);
            setResetDisabled(false)
            event.preventDefault();
            return;
        }
        //If he did set, the countdown begins:
        if (buttonName === "Start" || buttonName === "Resume") {

            setTimerId(setTimeout(function tick(){
                //If the timer will finish countdown, inform the user.
                if (timeGap === 0){
                    clearTimeout(timerId);
                    setButtonName("Start");
                    setDisabled(false);
                    setResetDisabled(false);
                    alert("The time is over");
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

            setButtonName("Pause");
        } else {
            clearTimeout(timerId);
            setResetDisabled(false);//The "RESET" button is enable if the button "Pause" was clicked
            setButtonName("Resume");
        } 
        event.preventDefault();
    }

    // //Function to handle timer state. It invokes every time, when user clicks on "Start"/"Pause"/"Resume" buttons.
    // //This is the second realization of timer functionality. The idea: according to the time, that user set, the
    // //"Date" object created with that initial time; every second from this "Date" object (from object timestamp)
    // //subtracted 1000ms, until its Hours, Minutes and Seconds value will be 0. 
    // function handleStartStopClick(event){

    //     setDisabled(true);
    //     setResetDisabled(true);
    //     let timerDate = remainingTime;//The "timerDate" object contains current timer value. To resume timer countdown it assigned to the last timer state.
    //     const timeGapInMs = (time.hours * 3600 + time.minutes * 60 + time.seconds)*1000;//The total time that timer should pass (in milliseconds)
        
    //     //At the beginning, when user clicks on button "Start", make initial settings
    //     if (buttonName === "Start"){
    //         setTimerState({
    //             timerHours: time.hours,
    //             timerMinutes: time.minutes,
    //             timerSeconds: time.seconds
    //         }); 
    //         timerDate = new Date();
    //         timerDate.setHours(time.hours, time.minutes, time.seconds, 0);
    //         setRemainingTime(timerDate);
    //     }
    //     //"Do nothing" if the user didn't set a time.
    //      if (timeGapInMs === 0) {
    //         setDisabled(false);
    //         setResetDisabled(false);
    //         event.preventDefault();
    //         return;
    //     }
    //     //If he did set, the countdown begins:
    //     if (buttonName === "Start" || buttonName === "Resume") {

    //         setTimerId(setTimeout(function tick(){
    //             setTimerState({
    //                 timerHours: timerDate.getHours(), 
    //                 timerMinutes: timerDate.getMinutes(), 
    //                 timerSeconds: timerDate.getSeconds()
    //             });

    //             if (timerDate.getHours() === 0 && timerDate.getMinutes() === 0 && timerDate.getSeconds() === 0){
    //                 clearTimeout(timerId);
    //                 setButtonName("Start");
    //                 setDisabled(false);
    //                 setResetDisabled(false);
    //                 alert("The time is over");
    //                 return;
    //             }

    //             timerDate.setTime(timerDate.getTime() - 1000);
    //             setRemainingTime(timerDate);
    //             setTimerId(setTimeout(tick, 1000));
                
    //         }, 1000));

    //         setButtonName("Pause");

    //     } else {
    //         clearTimeout(timerId);
    //         setResetDisabled(false);//The "RESET" button is enable if the button "Pause" was clicked
    //         setButtonName("Resume");
    //     } 
    //     event.preventDefault();
    // }
    
    //Function handles click on the "RESET" button. It resets all fileds to "0".
    function resetState(event){
        setTime({
            hours: 0,
            minutes: 0,
            seconds: 0
        });
        setReset(0);//resets to "0" values of input elements
        setTimerState({timerHours: 0, timerMinutes: 0, timerSeconds: 0});
        setButtonName("Start");
        setDisabled(false);//Enables input fields and Up/Down buttons
        event.preventDefault();
    }

    //Function used to add a zero if the "timeValue" is less then 10. It needs to make timer countdown visually match the format 00:00:00.
    function addZero(timeValue){
        if (timeValue < 10) return "0" + timeValue;
        else return timeValue;
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
        event.preventDefault();
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

    return <div className="timer">
        <form>
        <div className = "digit-container">
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

            <button onClick={handleStartStopClick}>{buttonName}</button>
            <button onClick = {resetState} disabled = {isResetDisabled}>RESET</button>
        </form>
        <h1>{addZero(timerState.timerHours)} : {addZero(timerState.timerMinutes)} : {addZero(timerState.timerSeconds)}</h1>
    </div>
    
}

export default Timer;