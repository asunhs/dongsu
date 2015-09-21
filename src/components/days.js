import _ from 'underscore';
import React from 'react';
import DayStore from '../stores/day.js';
import Day from './day.js';


var Days = React.createClass({
    getInitialState() {
        return {
            curr: DayStore.getThisWeek(),
            prev: DayStore.getPrevWeek()
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
            curr: DayStore.getThisWeek(),
            prev: DayStore.getPrevWeek()
        });
    },
    toggle(event) {
        event.preventDefault();
        this.setState({
            more: !this.state.more
        });
    },

    render() {

        var curr = this.state.curr,
            prev = this.state.prev,
            more = !!this.state.more;

        function getDays() {

            var thisWeek = _.map(curr, (day, index) => {
                return <Day key={index} id={index}/>
            });

            if (more) {
                return _.union(thisWeek, _.map(prev, (day, index) => {
                    return <Day key={index + 7} id={index + 7} disabled={true}/>
                }));
            }

            return thisWeek;
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
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="5" onClick={this.toggle} onTouchStart={this.toggle}>{more ? 'Close' : 'More'}</td>
                    </tr>
                </tfoot>
            </table>
        );
    }
});

export default Days;