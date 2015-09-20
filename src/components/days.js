import _ from 'underscore';
import React from 'react';
import DayStore from '../stores/day.js';
import Day from './day.js';


var Days = React.createClass({
    getInitialState() {
        return {
            days: DayStore.getAll()
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
            days: DayStore.getAll()
        });
    },
    toggle(event) {
        event.preventDefault();
        this.setState({
            prev: !this.state.prev
        });
    },

    render() {

        var days = this.state.days,
            prev = !!this.state.prev;

        function getDays() {
            if (prev) {
                return _.map(days, (day, index) => {
                    return <Day key={index} id={index}/>
                });
            }

            return _.map(days.slice(0,7), (day, index) => {
                return <Day key={index} id={index}/>
            });
        }

        return (
            <table className="timetable">
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Worked</th>
                        <th>Mode</th>
                    </tr>
                </thead>
                <tbody>
                    {getDays()}
                    <tr>
                        <td colSpan="5" onClick={this.toggle} onTouchStart={this.toggle}>{prev ? 'Close' : 'More'}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
});

export default Days;