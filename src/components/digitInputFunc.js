
 //-------------------Functions for "DigitInputBlock" component-------------------//

    //Function passed to "DigitInputBlock" component. It controls the values that user can type to the input element.
    //"DigitInputBlock" is used to set independant values of time: "hours", "minutes" and "seconds"
    function validInput(event, setTime){
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
    function handleUpDownClick(event, fieldName, time, setTime){
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
            setInputUpDownBoundary(name, 23, fieldName, setTime);

        //If the user clicks on buttons "Up"/"Down" which belong to the input field with name "minutes" or "seconds":
        } else {
            setInputUpDownBoundary(name, 59, fieldName, setTime);
        }     
    }

    //This function receives the name of the button, that was clicked ("up" or "down"), the boundary value and the input element name.
    //It either increases or decreases the "value" of "input" element. The "boundaryValue" limits max values for "hours" (23),
    //"minutes" (59) and "seconds" (59). For example, if User wants to increase "hours" field when it's previous value
    //was "23", he clicks on "up" arrow-button, and this function will set it's value to "0", because Hours can vary from 0 to 23. 
    //(Minutes and seconds - from 0 to 59). Time format from 00:00:00 to 23:59:59.
    function setInputUpDownBoundary(buttonName, boundaryValue, fieldName, setTime){
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

export {validInput, handleUpDownClick};