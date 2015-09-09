import _ from 'underscore';
import React from 'react';
import DayStore from '../stores/day.js';
import {getTimeString} from '../utils/date.js';


var Dashboard = React.createClass({
    getInitialState() {
        return {
            total: DayStore.getTotal()
        };
    },
    componentDidMount() {
        DayStore.addChangeListener(this.update);
    },
    componentWillUnmount() {
        DayStore.removeChangeListener(this.update);
    },
    update() {
        this.setState({
            total: DayStore.getTotal()
        });
    },

    render() {
        return (
            <div>Total  {getTimeString(this.state.total)}</div>
        );
    }
});

export default Dashboard;