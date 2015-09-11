import DayStore from '../stores/day.js';
import DayAction from '../actions/day.js';
import {getTimeString} from '../utils/date.js';


class Recorder {
    constructor() {
        this.recording = false;
        this.targetId = DayStore.getTodayId();
    }
    set() {
        var targetId = this.targetId;

        if (targetId < 0) {
            return;
        }

        if (this.recording) {
            return;
        }

        this.recording = true;
        this.interval = setInterval(() => {
            var now = new Date(),
                target = DayStore.get(targetId);

            if (!target.start) {
                DayAction.change({
                    id: targetId,
                    start: getTimeString(now.getHours(), now.getMinutes()),
                    end: getTimeString(now.getHours(), now.getMinutes())
                });
            } else {
                DayAction.change({
                    id: targetId,
                    start: target.start,
                    end: getTimeString(now.getHours(), now.getMinutes())
                });
            }
        }, 500);
    }
    clear() {
        this.recording = false;
        clearInterval(this.interval);
    }
}

export default Recorder;