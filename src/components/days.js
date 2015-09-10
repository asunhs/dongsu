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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {
                    _.map(this.state.days, (day, index) => {
                        return <Day key={index} id={index}/>
                    })
                }
                </tbody>
            </table>
        );
    }
});

export default Days;