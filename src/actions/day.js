import Dispatcher from '../dispatcher.js';
import Actions from './actions.js';

var DayAction = {
    toggle(id) {
        Dispatcher.dispatch({
            type: Actions.DAY_TOGGLE,
            id: id
        });
    },
    change(day) {
        Dispatcher.dispatch({
            type: Actions.DAY_CHANGE,
            day: day
        });
    }
};

export default DayAction;