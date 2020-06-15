import React from "react";
import addZero from "../addZero.js";//Function used to add a zero to the passed in "timeValue" if is less then 10.

function ItemTimeZones(props){

    const buttonGetTime = document.querySelector(".single-city-container .button-" + props.cityName.toLowerCase());
    const containerTimeInCity = document.querySelector(".single-city-container .button-" + props.cityName.toLowerCase() + " ~ .container-time-in-city");

    function handleGetTimeClick(){
        buttonGetTime.classList.add("hide-element");
        containerTimeInCity.classList.remove("hide-element");
    }
    function handleCloseClick() {
        buttonGetTime.classList.remove("hide-element");
        containerTimeInCity.classList.add("hide-element");
    }
    return <div className="single-city-container">

                <button 
                    className = {"button-time button-" + props.cityName.toLowerCase()}
                    onClick = {handleGetTimeClick}>GET TIME {<span className = "timeZone">{props.timeZone}</span>}
                </button>
                <div className = "container-time-in-city hide-element">
                    <div className = "time-text">{(props.time.getHours() + props.offset > 23) ? (addZero(props.time.getHours() + props.offset - 24)) : (addZero(props.time.getHours() + props.offset))} : {addZero(props.time.getMinutes())} : {addZero(props.time.getSeconds())}</div>
                    <button className = "button-close" onClick = {handleCloseClick}></button>
                </div>
                
            </div>
}

export default ItemTimeZones;

                