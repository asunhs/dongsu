import _ from 'underscore';
import React from 'react';
import DayStore from '../stores/day.js';
import DayAction from '../actions/day.js';
import {getTimeString} from '../utils/date.js';
import Recorder from '../utils/recorder.js';



var todayId = DayStore.getTodayId(),
    recorder = new Recorder();

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
    record() {
        if (DayStore.isRecording()) {
            recorder.set();
        } else {
            recorder.clear();
        }
    },
    componentDidMount() {
        this.record();
        DayStore.addChangeListener(this.update);
    },
    componentWillUnmount() {
        DayStore.removeChangeListener(this.update);
    },
    update() {
        this.record();
        this.setState(getData());
    },
    toggle() {
        event.preventDefault();
        DayAction.record();
    },
    autoRecord() {
        event.preventDefault();
        DayAction.auto();
    },
    render() {
        return (
            <div className="dashboard">
                <div className={DayStore.isAutoRecord() ? 'hb auto' : 'hb auto off'} onClick={this.autoRecord} onTouchStart={this.autoRecord}>{ DayStore.isAutoRecord() ? 'AUTO' : 'MANUAL' }</div>
                <div className={DayStore.isRecording() ? 'hb record' : 'hb record off'} onClick={this.toggle} onTouchStart={this.toggle}>{ DayStore.isRecording() ? 'RECODING' : 'STOP' }</div>

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