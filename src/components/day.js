import React from 'react';
import DayStore from '../stores/day.js';
import DayAction from '../actions/day.js';


var Day = React.createClass({
    getInitialState() {
        return {
            day: DayStore.get(this.props.id)
        };
    },
    toggle() {
        DayAction.toggle(this.props.id);
    },
    render() {

        var day = this.state.day,
            disabled = !day.workingHour;

        return (
            <tr>
                <td><span className={ disabled ? 'disabled' : '' } onClick={this.toggle}>V</span></td>
                <td>{day.date}</td>
                <td><input type="time" disabled={disabled}/></td>
                <td><input type="time" disabled={disabled}/></td>
            </tr>
        );
    }
});

export default Day;