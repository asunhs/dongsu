import _ from 'underscore';
import $ from 'jquery';
import React from 'react';
import Day from './components/day.js';
import DayStore from './stores/day.js';

$(document).ready(function () {

    function getDays() {
        return _.map(DayStore.getAll(), (day) => {
            return <Day id={day.index}/>
        });
    }

    return React.render(
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Day</th>
                        <th>Start</th>
                        <th>End</th>
                    </tr>
                </thead>
                <tbody>{ getDays() }</tbody>
            </table>
        </div>,
        document.body
    );
});