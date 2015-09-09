import _ from 'underscore';
import React from 'react';
import DayStore from '../stores/day.js';
import DayAction from '../actions/day.js';


var Day = React.createClass({
    getInitialState() {
        return DayStore.get(this.props.id);
    },
    componentWillReceiveProps() {
        this.setState(DayStore.get(this.props.id));
    },
    toggle() {
        DayAction.toggle(this.props.id);
    },
    handleStart(event) {
        DayAction.change(_.extend({}, this.state, {
            start: event.target.value
        }));
    },
    handleEnd(event) {
        DayAction.change(_.extend({}, this.state, {
            end: event.target.value
        }));
    },
    render() {

        var disabled = !this.state.workingHour;

        return (
            <tr>
                <td><span className={ disabled ? 'disabled' : '' } onClick={this.toggle}>{this.state.workingHour}h</span></td>
                <td>{this.state.date}</td>
                <td><input type="time" disabled={disabled} value={this.state.start} onChange={this.handleStart}/></td>
                <td><input type="time" disabled={disabled} value={this.state.end} onChange={this.handleEnd}/></td>
            </tr>
        );
    }
});

export default Day;