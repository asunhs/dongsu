import _ from 'underscore';
import React from 'react';
import Day from '../models/day.js';
import DayStore from '../stores/day.js';
import DayAction from '../actions/day.js';
import {getTime, getTimeString} from '../utils/date.js';
import Recorder from '../utils/recorder.js';



var todayId = DayStore.getTodayId(),
    recorder = new Recorder();

function getData() {
    var total = DayStore.getTotal(),
        fulltime = DayStore.getFullWorkingHour(),
        today = DayStore.get(todayId) || new Day();

    return {
        total: total,
        fulltime: fulltime,
        remain: Math.max(fulltime - total, 0),
        today: today.getWorkedTime(),
        start: getTime(today.start),
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
    info() {
        this.setState({
            info: (this.state.info == 'on') ? 'off' : 'on'
        });
        this.update();
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

        var start = this.state.start,
            firstHalfEnd = getTimeString(start + (4 * 60)),
            secondHalfStart = getTimeString(start + (4 * 60) + 30),
            reverseHour = getTimeString(start + (8 * 60)),
            officeHour = getTimeString(start + (9 * 60));

        return (
            <div className="dashboard">
                <div className={DayStore.isAutoRecord() ? 'hb auto clk' : 'hb auto clk off'} onClick={this.autoRecord} onTouchStart={this.autoRecord}>{ DayStore.isAutoRecord() ? 'AUTO' : 'MANUAL' }</div>
                <div className={DayStore.isRecording() ? 'hb record clk' : 'hb record clk off'} onClick={this.toggle} onTouchStart={this.toggle}>{ DayStore.isRecording() ? 'RECODING' : 'STOPPED' }</div>

                <div className="main">
                    <div className="big">
                        <div><span className={this.state.light}>●</span> Today</div>
                        <div className="clk" onClick={this.info} onTouchStart={this.info}>{getTimeString(this.state.today)}</div>
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
                <div className="info">
                    <div className={this.state.info}>
                        <div className="section">
                            <div>1st Half E</div>
                            <div>{firstHalfEnd}</div>
                        </div>
                        <div className="section">
                            <div>2nd Half S</div>
                            <div>{secondHalfStart}</div>
                        </div>
                        <div className="section">
                            <div>Reverse T</div>
                            <div>{reverseHour}</div>
                        </div>
                        <div className="section">
                            <div>2nd Half E</div>
                            <div>{officeHour}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Dashboard;