import _ from 'underscore';
import Dispatcher from '../dispatcher.js';
import {EventEmitter} from 'events';
import Actions from '../actions/actions.js';
import {getTime, getDiff, getCurrentWeek} from '../utils/date.js';
import Day from '../models/day.js'
import DayStorage from '../storages/days.js';


function loadDays() {
    var stored = DayStorage.get();

    return _.map(getCurrentWeek(), date => {
        var matched = _.findWhere(stored, {
            date: date.getTime()
        });

        if (!!matched) {
            return new Day(date, matched.start, matched.end, matched.workingHour);
        }
        return new Day(date);
    });
}


var days = loadDays(),
    DayStore = _.extend({}, EventEmitter.prototype, {
        emitChange() {
            DayStorage.set(days);
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
            return _.reduce(days, (sum, day) => sum + day.getWorkedTime(), 0);
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

console.log(days);

export default DayStore;

