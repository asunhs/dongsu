import _ from 'underscore';
import React from 'react';
import DayStore from '../stores/day.js';
import {getTimeString} from '../utils/date.js';


function getData() {
    var total = DayStore.getTotal(),
        fulltime = DayStore.getFullWorkingHour(),
        today = DayStore.getToday();

    return {
        total: total,
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
        this.setState(getData());
    },

    render() {
        return (
            <div>
                <p>Total {getTimeString(this.state.total)}</p>
                <p>Remain {getTimeString(this.state.remain)}</p>
                <p>Today {getTimeString(this.state.today)}</p>
                <p>Light {this.state.light}</p>
            </div>
        );
    }
});

export default Dashboard;