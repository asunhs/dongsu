import _ from 'underscore';

var DateUtils = {},
    TIME = /^(\d{1,2}):(\d{1,2})$/


function timePadding(n) {
    return (n > 9 ? '' : '0') + n;
}


function getTime(str) {
    if (!str) {
        return 0;
    }

    var matched = str.match(TIME);

    if (!matched) {
        return 0;
    }

    return parseInt(matched[1])*60 + parseInt(matched[2]);
}

function getTimeString(time) {
    return timePadding(Math.floor(time/60)) + ':' + timePadding(time%60);
}

function getDiff(start, end) {
    return (end - start + (24 * 60)) % (24 * 60);
}

function getCurrentWeek() {
    var today = new Date(),
        date = today.getDate(),
        day = today.getDay();

    return _.map([5,4,3,2,1], i => {
        var d = new Date()
        d.setDate(date - day + i);
        return d;
    });
}


DateUtils.getTime = getTime;
DateUtils.getTimeString = getTimeString;
DateUtils.getDiff = getDiff;

export default DateUtils;