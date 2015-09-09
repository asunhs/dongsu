import _ from 'underscore';
import React from 'react';
import DayStore from '../stores/day.js';


var Days = React.createClass({
    render() {
        return _.map(DayStore.getAll(), (day) => {
            return <Day id={day.index}/>
        });
    }
});

export default Days;