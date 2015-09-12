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
        today = DayStore.get(todayId) || new Day();

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
        return (
            <div className="dashboard">
                <div className={DayStore.isAutoRecord() ? 'hb auto clk' : 'hb auto clk off'} onClick={this.autoRecord} onTouchStart={this.autoRecord}>{ DayStore.isAutoRecord() ? 'AUTO' : 'MANUAL' }</div>
                <div className={DayStore.isRecording() ? 'hb record clk' : 'hb record clk off'} onClick={this.toggle} onTouchStart={this.toggle}>{ DayStore.isRecording() ? 'RECODING' : 'STOPPED' }</div>

                <div className="main">
                    <div className="big">
                        <div><span className={this.state.light}>●</span> Today</div>
                        <div onClick={this.info} onTouchStart={this.info}>{getTimeString(this.state.today)}</div>
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
                            <div>A</div>
                            <div>00:00</div>
                        </div>
                        <div className="section">
                            <div>B</div>
                            <div>00:00</div>
                        </div>
                        <div className="section">
                            <div>C</div>
                            <div>00:00</div>
                        </div>
                        <div className="section">
                            <div>D</div>
                            <div>00:00</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Dashboard;