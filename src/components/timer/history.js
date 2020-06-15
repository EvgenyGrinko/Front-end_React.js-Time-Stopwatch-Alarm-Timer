const history = {
    list: [],//an array of objects with unique values of time that were used as timer values
    //Function adds new value in the array. 
    add: function(obj){
        //Before addition, a deep clone of the passed in object created.
        const clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
        //And clone version of object is added to array.
        this.list.push(clone);
    },
    //This "get" method returns a deep copy of the array of objects. As this objects may have only stings and numbers, 
    //JS methods to handle JSON-formatted content is used for deep cloning. "JSON.stringify()" transforms JS object into 
    //a JSON string. "JSON.parse()" - from JSON string to JS object.
    get historyList() {
        return JSON.parse(JSON.stringify(this.list));
    } 
};

export default history;