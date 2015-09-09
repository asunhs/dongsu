import _ from 'underscore';
import Dispatcher from '../dispatcher.js';
import {EventEmitter} from 'events';
import Actions from '../actions/actions.js';
import {getTime, getDiff} from '../utils/date.js';


var days = [
        { index: 0, date: '9/7 (Mon)', workingHour: 8, start: '09:30', end: '18:30' },
        { index: 1, date: '9/8 (Tue)', workingHour: 8, start: '09:30', end: '18:30' },
        { index: 2, date: '9/9 (Wed)', workingHour: 8, start: '09:30', end: '18:30' },
        { index: 3, date: '9/10 (Thr)', workingHour: 8, start: '09:30', end: '18:30' },
        { index: 4, date: '9/11 (Fri)', workingHour: 8, start: '09:30', end: '18:30' }
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
        getTotal() {
            return _.chain(days).map(day => getDiff(getTime(day.start), getTime(day.end))).reduce((sum, time) => sum + time).value();
        },
        getFullWorkingHour() {
            return _.chain(days).pluck('workingHour').reduce((sum, time) => sum + (time*60)).value();
        },
        dispatchToken: Dispatcher.register((action) => {
            switch (action.type) {
                case Actions.DAY_CHANGE: {
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
                    break;
                }
            }
        })
    });

export default DayStore;

