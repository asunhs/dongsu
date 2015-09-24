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
        today: today
    };
}

var tick = false;

function getRunningTime(time) {
    if (!recorder.recording || tick) {
        return getTimeString(time);
    } else {
        return getTimeString(time).replace(":", " ");
    }
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
    info(event) {
        event.preventDefault();
        this.setState({
            info: (this.state.info == 'on') ? 'off' : 'on'
        });
        this.update();
    },
    toggle(event) {
        event.preventDefault();
        DayAction.record();
    },
    autoRecord(event) {
        event.preventDefault();
        DayAction.auto();
    },
    render() {

        var today = this.state.today,
            start = getTime(today.start),
            holiday = !today.workingHour,
            full = today.workingHour >= 8,
            worked = today.getWorkedTime(),
            overtime = worked - 480,
            light = today.getTrafficLight(),
            info = this.state.info;

        tick = !tick;

        function getInfo() {

            if (holiday) {
                return (
                    <div className="info">
                        <div className={info}>
                            <div className="section">
                                <div>4h Worked</div>
                                <div>{getTimeString(start + (4 * 60))}</div>
                            </div>
                            <div className="section">
                                <div>6h Worked</div>
                                <div>{getTimeString(start + (6 * 60))}</div>
                            </div>
                            <div className="section">
                                <div>8h Worked</div>
                                <div>{getTimeString(start + (8 * 60))}</div>
                            </div>
                            <div className="section">
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                );
            } else if (overtime >= 0 && full) {
                return (
                    <div className="info">
                        <div className={info}>
                            <div className="section">
                                <div>Over 2h</div>
                                <div>{getTimeString(start + (11 * 60))}</div>
                            </div>
                            <div className="section">
                                <div>Over 4h</div>
                                <div>{getTimeString(start + (13 * 60))}</div>
                            </div>
                            <div className="section">
                                <div>Over 6h</div>
                                <div>{getTimeString(start + (15 * 60))}</div>
                            </div>
                            <div className="section">
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="info">
                        <div className={info}>
                            <div className="section">
                                <div>1st Half E</div>
                                <div>{getTimeString(start + (4 * 60))}</div>
                            </div>
                            <div className="section">
                                <div>2nd Half S</div>
                                <div>{getTimeString(start + (4 * 60) + 30)}</div>
                            </div>
                            <div className="section">
                                <div>Reverse T</div>
                                <div>{getTimeString(start + (8 * 60))}</div>
                            </div>
                            <div className="section">
                                <div>2nd Half E</div>
                                <div>{getTimeString(start + (9 * 60))}</div>
                            </div>
                        </div>
                    </div>
                );
            }
        }

        return (
            <div className="dashboard">
                <div className={DayStore.isAutoRecord() ? 'hb auto clk' : 'hb auto clk off'} onClick={this.autoRecord} onTouchStart={this.autoRecord}>{ DayStore.isAutoRecord() ? 'AUTO' : 'MANUAL' }</div>
                <div className={DayStore.isRecording() ? 'hb record clk' : 'hb record clk off'} onClick={this.toggle} onTouchStart={this.toggle}>{ DayStore.isRecording() ? 'RECODING' : 'STOPPED' }</div>

                <div className="main">
                    <div className="big">
                        <div><span className={light}>●</span> Today</div>
                        <div className="clk" onClick={this.info} onTouchStart={this.info}>{getRunningTime(worked)}</div>
                        <div>{(overtime >= 0) ? '+ ' + getRunningTime(overtime) : ' '}</div>
                    </div>
                </div>
                <div className="board">
                    <div className="full time">
                        <div>Full time</div>
                        <div>{getTimeString(this.state.fulltime)}</div>
                    </div>
                    <div className="total time">
                        <div>Total</div>
                        <div>{holiday ? getTimeString(this.state.total) : getRunningTime(this.state.total)}</div>
                    </div>
                    <div className="remain time">
                        <div>Remain</div>
                        <div>{holiday ? getTimeString(this.state.remain) : getRunningTime(this.state.remain)}</div>
                    </div>
                </div>
                {getInfo()}
            </div>
        );
    }
});

export default Dashboard;