import Dispatcher from '../dispatcher.js';

var DayAction = {
    change(day) {
        Dispatcher.dispatch({
            type: 'change',
            day: day
        });
    }
};

export default DayAction;