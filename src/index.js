import $ from 'jquery';
import React from 'react';
import Day from './components/day.js';

$(document).ready(function () {
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
                <tbody>
                    <Day date="9/12(Fri)"/>
                    <Day date="9/11(Fri)"/>
                    <Day date="9/10(Fri)"/>
                    <Day date="9/9(Fri)"/>
                    <Day date="9/8(Fri)"/>
                </tbody>
            </table>
        </div>,
        document.body
    );
});