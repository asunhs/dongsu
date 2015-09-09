import $ from 'jquery';
import React from 'react';
import Days from './components/days.js';
import Dashboard from './components/dashboard.js';

$(document).ready(function () {

    return React.render(
        <div>
            <Dashboard />
            <Days />
        </div>,
        document.body
    );
});