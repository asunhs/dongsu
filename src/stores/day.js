import _ from 'underscore';
import Dispatcher from '../dispatcher.js';
import {EventEmitter} from 'events';
import Actions from '../actions/actions.js';
import {getTime, getDiff, getCurrentWeek} from '../utils/date.js';
import Day from '../models/day.js'
import Storage from '../storages/storage.js';

var DayStorage = new Storage('days'),
    AutoRecordStorage = new Storage('autoRecord');

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
    autoRecord = !!AutoRecordStorage.get(),
    recording = autoRecord,
    DayStore = _.extend({}, EventEmitter.prototype, {
        emitChange() {
            DayStorage.set(days);
            AutoRecordStorage.set(autoRecord);
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
        getThisWeek() {
            return days.slice(0,7);
        },
        getPrevWeek() {
            return days.slice(7,14);
        },
        getAll() {
            return days;
        },
        getTotal() {
            return _.chain(this.getThisWeek()).filter(day => day.workingHour > 0).reduce((sum, day) => sum + day.getWorkedTime(), 0).value();
        },
        getFullWorkingHour() {
            return _.reduce(this.getThisWeek(), (sum, day) => sum + day.getWorkingMinute(), 0);
        },
        getTodayId() {
            return _.findIndex(days, {
                today: true
            });
        },
        isRecording() {
            return recording;
        },
        isAutoRecord() {
            return autoRecord;
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
                case Actions.RECORD_TOGGLE: {
                    recording = !recording;
                    DayStore.emitChange();
                    break;
                }
                case Actions.AUTO_RECORD_TOGGLE: {
                    autoRecord = !autoRecord;
                    recording = autoRecord;
                    DayStore.emitChange();
                    break;
                }
            }
        })
    });

export default DayStore;

