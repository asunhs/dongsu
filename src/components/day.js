import _ from 'underscore';
import React from 'react';
import DayStore from '../stores/day.js';
import DayAction from '../actions/day.js';
import {getTimeString} from '../utils/date.js';


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
            disabled = !day.workingHour || day.isNotYet(),
            overtimeLevel = day.getOvertimeLevel();

        return (
            <tr>
                <td>{day.date}</td>
                <td><input type="time" disabled={disabled} value={day.start} onChange={this.handleStart}/></td>
                <td><input type="time" disabled={disabled} value={day.end} onChange={this.handleEnd}/></td>
                <td>{getTimeString(day.getWorkedTime())}</td>
                <td><span className={ disabled ? 'disabled' : '' } onClick={this.toggle} onTouchStart={this.toggle}>{day.workingHour}h</span>{overtimeLevel ? '+' + (overtimeLevel * 2) +'h' : ''}</td>
            </tr>
        );
    }
});

export default Day;