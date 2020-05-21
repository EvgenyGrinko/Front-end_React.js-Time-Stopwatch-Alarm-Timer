
const alarmHistory = {
    history: new Map(),
    add: function(key, obj){
        const clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
        this.history.set(key, clone);
    },
    delete: function(id){
        this.history.delete(id);
    },
    get historyList(){
        return new Map(this.history);
    }
};

export default alarmHistory;