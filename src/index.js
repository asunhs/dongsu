import $ from 'jquery';
import React from 'react';
import Days from './components/days.js';

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
                    <Days />
                </tbody>
            </table>
        </div>,
        document.body
    );
});