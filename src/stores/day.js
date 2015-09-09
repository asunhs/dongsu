import _ from 'underscore';
import Dispatcher from '../dispatcher.js';
import {EventEmitter} from 'events';
import Actions from '../actions/actions.js';


var days = [
        { index: 0, date: '9/7 (Mon)', workingHour: 8 },
        { index: 1, date: '9/8 (Tue)', workingHour: 8 },
        { index: 2, date: '9/9 (Wed)', workingHour: 8 },
        { index: 3, date: '9/10 (Thr)', workingHour: 8 },
        { index: 4, date: '9/11 (Fri)', workingHour: 8 }
    ],
    DayStore = _.extend({}, EventEmitter.prototype, {
        emitChange() {
            this.emit('change');
        },
        addChangeListener(callback) {
            this.on('change', callback);
        },
        removeChangeListener(callback) {
            this.removeListener('change', callback);
        },
        get(index) {
            return days[index];
        },
        getAll() {
            return days;
        },
        dispatchToken: Dispatcher.register((action) => {
            switch (action.type) {
                case 'change': {
                    let day = action.day;
                    days[day.index] = day;
                    DayStore.emitChange();
                    break;
                }
                case Actions.DAY_TOGGLE: {
                    let day = days[action.id];
                    switch (day.workingHour) {
                        case 0:
                            day.workingHour = 4;
                            break;
                        case 4:
                            day.workingHour = 8;
                            break;
                        default:
                            day.workingHour = 0;
                    }
                    DayStore.emitChange();
                }
            }
        })
    });

export default DayStore;

