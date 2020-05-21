//Function used to add a zero if the "timeValue" is less then 10. It applies to the time values to bring them to the format 00:00:00.
function addZero(timeValue){
    if (timeValue < 10) return "0" + timeValue;
    else return timeValue;
}

export default addZero;