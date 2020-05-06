import React, { useState } from "react";

//This is a reusable component to set up the value of time, according to the passed in it name of the field ("hours", "minutes", "seconds").
//The time format is from 00:00:00 to 23:59:59
function DigitInput(props){

    const [inputValue, setInputValue] = useState();//state of the "value" attribute of "input" element

    function validInput(event){
        const inputValue = Number(event.target.value);// "Number()" needs to handle problem with input of "0."
        const inputName = event.target.name;
        
        //If the User inputs a number and this number is appropriate ("hours" can be in the range of 0...23, 
        //"minutes" and "seconds" - 0...59), set the value of "input" element, depending on it's "name" attribute.
        //If he inputs not a number, set the value to empty string ("").
        if (!isNaN(inputValue)){
            if (inputName === "hours"){
                if (inputValue >= 0 && inputValue <= 23) setInputValue(inputValue);
            }else {
                if (inputValue >= 0 && inputValue <= 59) setInputValue(inputValue);
            }
        } else {
            setInputValue("");
        }
    }

    function handleUpDownClick(event){

        const name = event.target.name; //button name ("up" or "down")
        const fieldName = event.target.value; //the field name ("hours", "minutes" or "seconds") 

        //At the beginning, the "value" of "input" element is not initialized. If the user will try
        //to increase/decrease it's value by clicking on arrow-buttons, an error will happen.
        //To prevent this, check it and if it's not defiend, assign it to zero.  
        if (typeof(inputValue) === "undefined") setInputValue(0);

        //Hours can vary from 0 to 23. Minutes and seconds - from 0 to 59. That's why at first make check for
        //"hours" field and then both for "minutes" and "seconds".
        if (fieldName === "hours") {
            setInputUpDownBoundary(name, 23);
        } else {
            setInputUpDownBoundary(name, 59);
        }
    }

    //This function receives the name of the button, that was clicked ("up" or "down"), and the boundary value and
    //increases or decreases the "value" of "input" element. The "boundaryValue" limits max values for "hours" (23),
    //"minutes" (59) and "seconds" (59). For example, if User wants to increase "hours" field when it's previous value
    //was "23", he clicks on "up" arrow-button, and this function will set it's value to "0", because the time format
    //after 23:59:59 is 00:00:00.
    function setInputUpDownBoundary(buttonName, boundaryValue){
        setInputValue(function(prevValue) {
            if (buttonName === "up"){
                if (prevValue === boundaryValue) return 0
                else return ++prevValue;
            
            } else {
                if (prevValue === 0) return boundaryValue;
                else return --prevValue;
            }
        });
    }

    return <div className="digit-input">
        <button name = "up" value={props.fieldName} className = "arrow up-arrow" onClick={handleUpDownClick}></button>
        <input type="text" title={props.fieldName} name={props.fieldName} size = "2" maxlength = "2" onChange = {validInput} value={inputValue} placeholder = "00"></input>
        <button name = "down" value={props.fieldName} className = "arrow down-arrow" onClick={handleUpDownClick}></button>
    </div>
}

export default DigitInput;