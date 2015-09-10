import _ from 'underscore';
import {getTime, getDiff} from '../utils/date.js';


var week = [' (Sun)', ' (Mon)', ' (Tue)', ' (Wed)', ' (Thr)', ' (Fri)', ' (Sat)'];


class Day {
    constructor(t, start, end) {
        var time = !t ? new Date() : new Date(t),
            month = time.getMonth() + 1,
            date = time.getDate(),
            day = time.getDay(),
            now = new Date();

        time.setHours(0,0,0,0);
        now.setHours(0,0,0,0);

        var diff = time.getTime() - now.getTime();

        this.date = month + '/' + date;
        this.workingHour = 8;

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
    getWorkingMinute() {
        return this.workingHour * 60;
    }
    getDiff() {
        if (this.isNotYet()) {
            return 0;
        }
        if (!this.workingHour) {
            return 0;
        }
        return getDiff(getTime(this.start), getTime(this.end));
    }
    getWorkedTime() {
        var diff = this.getDiff();

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

        if (this.workingHour < 8) {
            return 0;
        }

        var diff = this.getDiff();

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
    isNotYet() {
        return this.state == Day.NOT_YET;
    }
}


Day.NOT_YET = 'NOT_YET';
Day.RECODING = 'RECODING';
Day.RECODED = 'RECODED';


Day.GREEN = 'GREEN';
Day.YELLOW = 'YELLOW';
Day.RED = 'RED';




export default Day;