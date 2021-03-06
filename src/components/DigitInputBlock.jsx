import React from "react";

function DigitInputBlock(props){

    function handleChange(event){
        props.inputValidation(event);
    }

    function handleUpDownClick(event){
        props.onUpDownClick(event, props.fieldName);
        event.preventDefault();
    }

    return <div className="digit-input">
                <button 
                    name = "up" 
                    className = {"arrow up-arrow " + ((props.isDisabled) ? "button-disabled" : "button-enabled")} 
                    onClick={handleUpDownClick} 
                    disabled = {props.isDisabled}>
                </button>
                <input 
                    type="text" 
                    className = {"digit-input-text " + ((props.isDisabled) ? "disabled" : "")}
                    title={props.fieldName} 
                    name={props.fieldName} 
                    size = "2" 
                    maxLength = "2" 
                    onChange = {handleChange} 
                    value={props.fieldValue} 
                    disabled = {props.isDisabled}>
                </input>
                <button 
                    name = "down" 
                    className = {"arrow down-arrow " + ((props.isDisabled) ? "button-disabled" : "button-enabled")}
                    onClick={handleUpDownClick} 
                    disabled = {props.isDisabled}>
                </button>
            </div>
}

export default DigitInputBlock;