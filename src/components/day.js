import _ from 'underscore';
import React from 'react';
import DayStore from '../stores/day.js';
import DayAction from '../actions/day.js';


var Day = React.createClass({
    getInitialState() {
        return {
            day: DayStore.get(this.props.id)
        };
    },
    componentWillReceiveProps() {
        this.setState({
            day: DayStore.get(this.props.id)
        });
    },
    toggle(event) {
        event.preventDefault();
        DayAction.toggle(this.props.id);
    },
    handleStart(event) {
        DayAction.change({
            id: this.props.id,
            start: event.target.value,
            end: this.state.day.end
        });
    },
    handleEnd(event) {
        DayAction.change({
            id: this.props.id,
            start: this.state.day.start,
            end: event.target.value
        });
    },
    render() {

        var day = this.state.day,
            disabled = !day.workingHour;

        return (
            <tr>
                <td><span className={ disabled ? 'disabled' : '' } onClick={this.toggle} onTouchStart={this.toggle}>{day.workingHour}h</span></td>
                <td>{day.date}</td>
                <td><input type="time" disabled={disabled} value={day.start} onChange={this.handleStart}/></td>
                <td><input type="time" disabled={disabled} value={day.end} onChange={this.handleEnd}/></td>
                <td>{day.getOvertimeLevel()}</td>
            </tr>
        );
    }
});

export default Day;