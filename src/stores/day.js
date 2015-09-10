import _ from 'underscore';
import Dispatcher from '../dispatcher.js';
import {EventEmitter} from 'events';
import Actions from '../actions/actions.js';
import {getTime, getDiff} from '../utils/date.js';
import Day from '../models/day.js'


var days = [
        new Day(new Date(2015, 8, 11), '09:00', '18:00'),
        new Day(new Date(2015, 8, 10), '09:00', '18:00'),
        new Day(new Date(2015, 8, 9), '09:00', '20:00'),
        new Day(new Date(2015, 8, 8), '09:00', '22:00'),
        new Day(new Date(2015, 8, 7), '09:00', '00:00')
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
            return _.chain(days).filter(day => day.state != Day.NOT_YET).reduce((sum, day) => sum + day.getWorkedTime(), 0).value();
        },
        getFullWorkingHour() {
            return _.reduce(days, (sum, day) => sum + day.getWorkingMinute(), 0);
        },
        getToday() {
            return _.findWhere(days, {
                today: true
            });
        },
        dispatchToken: Dispatcher.register((action) => {
            switch (action.type) {
                case Actions.DAY_CHANGE: {
                    let newDay = action.day,
                        oldDay = days[newDay.id];
                    oldDay.start = newDay.start;
                    oldDay.end = newDay.end;
                    DayStore.emitChange();
                    break;
                }
                case Actions.DAY_TOGGLE: {
                    days[action.id].toggleWorkingHour();
                    DayStore.emitChange();
                    break;
                }
            }
        })
    });

export default DayStore;

