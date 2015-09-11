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

function getTimeString(hour, min) {
    if (_.isNumber(min)) {
        return timePadding(hour) + ':' + timePadding(min);
    }
    return timePadding(Math.floor(hour/60)) + ':' + timePadding(hour%60);
}

function getDiff(start, end) {
    return (end - start + (24 * 60)) % (24 * 60);
}

function getCurrentWeek() {
    var today = new Date(),
        date = today.getDate(),
        day = today.getDay();

    return _.map([5,4,3,2,1], i => {
        var d = new Date();
        d.setDate(date - day + i);
        d.setHours(0,0,0,0);
        return d;
    });
}


DateUtils.getTime = getTime;
DateUtils.getTimeString = getTimeString;
DateUtils.getDiff = getDiff;
DateUtils.getCurrentWeek = getCurrentWeek;

export default DateUtils;