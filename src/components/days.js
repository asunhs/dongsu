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

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Day</th>
                        <th>Start</th>
                        <th>End</th>
                    </tr>
                </thead>
                <tbody>
                {
                    _.map(this.state.days, (day) => {
                        return <Day key={day.index} id={day.index}/>
                    })
                }
                </tbody>
            </table>
        );
    }
});

export default Days;