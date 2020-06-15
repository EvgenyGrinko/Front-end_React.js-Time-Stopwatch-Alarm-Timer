import React, { useState } from "react";
import InitialCurtain from "../InitialCurtain";//Initial component-curtain that hides main functionality.
import CloseComponent from "../CloseComponent";//Component used to close currently opened main one.
import timeZonesRussia from "./timeZonesRussia";//An array of objects. Each one represents one city (Russian federal centers of different regions) and its timezone value.
import ItemTimeZones from "./ItemTimeZones";//Component allows to get time of one city, according to its timezone.
import ItemCityName from "./ItemCityName";//Component return only name of the city.

function Time(){

    const [time, setTime] = useState(new Date());
    const [timerId, setTimerId] = useState();
    const [buttonAllTimesName, setButtonAllTimeName] = useState("GET ALL TIMES")
    const buttonsGetTime = document.querySelectorAll(".single-city-container .button-time");
    const containersTimeInCity = document.querySelectorAll(".single-city-container .container-time-in-city");

    function handleCurtainClick(){
        document.querySelector(".time .initial-curtain").style.display = "none";
        setTimerId(setTimeout(function tick(){
            setTime(new Date());
            setTimerId(setTimeout(tick, 1000));
        }, 1000));
    }
    
    function handleButtonAllTimesClick(){
        if (buttonAllTimesName === "GET ALL TIMES"){
            setButtonAllTimeName("HIDE ALL TIMES");
            buttonsGetTime.forEach((item) => {item.classList.add("hide-element")});
            containersTimeInCity.forEach((item) => {item.classList.remove("hide-element")});
        } else {
            setButtonAllTimeName("GET ALL TIMES");
            buttonsGetTime.forEach((item) => {item.classList.remove("hide-element")});
            containersTimeInCity.forEach((item) => {item.classList.add("hide-element")});
        }
    }
    // function stopAllTimes(){
    //     clearTimeout(timerId);
    // }

    return <div className="container time">
                <InitialCurtain name = "Time" handleCurtainClick = {handleCurtainClick}/>

                <div className = "time-area-button-close">
                    <CloseComponent name="time"/>
                </div>
                <div className="time-area-list-of-times">
                    {timeZonesRussia.map(function(item, index){
                        return <ItemTimeZones 
                                    cityName = {item.name} 
                                    timeZone = {item.timeZone} 
                                    offset = {index - 1} 
                                    time = {time}
                                />
                    })}
                </div>
                <div className = "time-area-list-of-cities">
                    {timeZonesRussia.map(function(item){
                        return <ItemCityName cityName = {item.name} />
                    })}
                
                </div>
                <div className = "time-area-button-for-all-cities">
                    <button className = "button-get-all-times" onClick = {handleButtonAllTimesClick}>{buttonAllTimesName}</button>
                    {/* <button classNAme = "button-stop-all-times" onClick = {stopAllTimes}>{buttonStopAllTimesName}STOP ALL TIMES</button> */}
                </div>

            </div>
}

export default Time;