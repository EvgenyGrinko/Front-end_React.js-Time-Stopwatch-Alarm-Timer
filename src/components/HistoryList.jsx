import React from "react";

function HistoryList(props){

    function addZero(timeValue){
        if (timeValue < 10) return "0" + timeValue;
        else return timeValue;
    }
    
    const listItems = props.history.map(function (item, index) {
        return <li onClick = {handleItemClick} key = {index} id = {index}>{addZero(item.hours)} : {addZero(item.minutes)} : {addZero(item.seconds)}</li>
    });
    
    function handleItemClick(event){
        const id = event.target.id;
        props.onItemClick(id);
    }

    return <div className = "history-list" style = {{display: props.display}}>

                {props.history.length === 0 ? <p>History is empty</p> : <ul>{listItems}</ul>}
                
                <button className = "close-button" title="close" onClick = {props.onCancelClick}></button>

            </div>
}

export default HistoryList;