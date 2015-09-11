import _ from 'underscore';
import React from 'react';
import Day from '../models/day.js';
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

                <div className="main">
                    <div className="big">
                        <div><span className={this.state.light}>●</span> Today</div>
                        <div>{getTimeString(this.state.today)}</div>
                    </div>
                </div>
                <div className="board">
                    <div className="full time">
                        <div>Full time</div>
                        <div>{getTimeString(this.state.fulltime)}</div>
                    </div>
                    <div className="total time">
                        <div>Total</div>
                        <div>{getTimeString(this.state.total)}</div>
                    </div>
                    <div className="remain time">
                        <div>Remain</div>
                        <div>{getTimeString(this.state.remain)}</div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Dashboard;