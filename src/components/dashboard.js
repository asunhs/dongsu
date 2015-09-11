import _ from 'underscore';
import React from 'react';
import DayStore from '../stores/day.js';
import DayAction from '../actions/day.js';
import {getTimeString} from '../utils/date.js';
import Recorder from '../utils/recorder.js';



var todayId = DayStore.getTodayId(),
    recorder = new Recorder();

//recorder.set();

function getData() {
    var total = DayStore.getTotal(),
        fulltime = DayStore.getFullWorkingHour(),
        today = DayStore.get(todayId);

    return {
        total: total,
        fulltime: fulltime,
        remain: Math.max(fulltime - total, 0),
        today: today.getWorkedTime(),
        light: today.getTrafficLight()
    };
}


var Dashboard = React.createClass({
    getInitialState() {
        return getData();
    },
    componentDidMount() {
        DayStore.addChangeListener(this.update);
    },
    componentWillUnmount() {
        DayStore.removeChangeListener(this.update);
    },
    update() {
        if (DayStore.isRecording()) {
            recorder.set();
        } else {
            recorder.clear();
        }
        this.setState(getData());
    },
    toggle() {
        event.preventDefault();
        DayAction.record();
    },
    render() {
        return (
            <div>
                <p onClick={this.toggle} onTouchStart={this.toggle}>{ DayStore.isRecording() ? 'RECODING' : 'STOP' }</p>
                <p>FullTime {getTimeString(this.state.fulltime)}</p>
                <p>Total {getTimeString(this.state.total)}</p>
                <p>Remain {getTimeString(this.state.remain)}</p>
                <p>Today {getTimeString(this.state.today)}</p>
                <p>Light {this.state.light}</p>
            </div>
        );
    }
});

export default Dashboard;