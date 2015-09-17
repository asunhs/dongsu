import _ from 'underscore';
import {getTime, getDiff} from '../utils/date.js';


var week = [' (Sun)', ' (Mon)', ' (Tue)', ' (Wed)', ' (Thr)', ' (Fri)', ' (Sat)'];


class Day {
    constructor(t, start, end, workingHour) {
        var time = !t ? new Date() : new Date(t),
            now = new Date();

        time.setHours(0,0,0,0);
        now.setHours(0,0,0,0);

        var diff = time.getTime() - now.getTime();

        this.date = time.getTime();
        this.workingHour = _.isNumber(workingHour) ? workingHour : (time.getDay() == 0 || time.getDay() == 6) ? 0 : 8;

        if (diff > 0) {
            this.state = Day.NOT_YET;
            this.today = false;
        } else if (diff < 0) {
            this.state = Day.RECODED;
            this.start = start;
            this.end = end;
            this.today = false;
        } else {
            this.state = Day.RECODING;
            this.start = start;
            this.end = end;
            this.today = true;
        }
    }
    toggleWorkingHour() {
        switch (this.workingHour) {
            case 0:
                this.workingHour = 4;
                break;
            case 4:
                this.workingHour = 8;
                break;
            default:
                this.workingHour = 0;
                break;
        }
    }
    getDateString() {
        var date = new Date(this.date);
        return (date.getMonth() + 1) + '/' + date.getDate();
    }
    getWorkingMinute() {
        return this.workingHour * 60;
    }
    getDiff() {
        if (this.isNotYet()) {
            return 0;
        }
        return getDiff(getTime(this.start), getTime(this.end));
    }
    getState() {
        if (this.isNotYet()) {
            return 'disabled';
        } else if (this.today) {
            return 'today';
        } else if (!this.workingHour) {
            return 'holiday';
        } else {
            return 'expired';
        }
    }
    getWorkedTime() {

        var diff = this.getDiff();

        if (!this.workingHour) {
            return diff;
        }

        if (diff >= 480) {
            return diff - 60;
        } else if (diff >= 270) {
            return diff - 30;
        } else if (diff >= 240) {
            return 240;
        } else {
            return diff;
        }
    }
    getTrafficLight() {
        var diff = this.getDiff();

        if (diff >= 480) {
            return Day.RED;
        } else if (diff >= 450) {
            return Day.YELLOW;
        } else {
            return Day.GREEN;
        }
    }
    getOvertimeLevel() {

        var diff = this.getDiff();

        if (!this.workingHour) {
            if (diff >= 480) {
                return 4;
            } else if (diff >= 360) {
                return 3;
            } else if (diff >= 240) {
                return 2;
            } else {
                return 0;
            }
        } else if (this.workingHour < 8) {
            return 0;
        } else {
            if (diff >= 900) {
                return 3;
            } else if (diff >= 780) {
                return 2;
            } else if (diff >= 660) {
                return 1;
            } else {
                return 0;
            }
        }
    }
    isNotYet() {
        return this.state == Day.NOT_YET;
    }
}


Day.NOT_YET = 'NOT_YET';
Day.RECODING = 'RECODING';
Day.RECODED = 'RECODED';


Day.GREEN = 'green';
Day.YELLOW = 'yellow';
Day.RED = 'red';




export default Day;