import $ from 'jquery';
import React from 'react';

$(document).ready(function () {
    return React.render(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Day</th>
                        <th>Start</th>
                        <th>End</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>9/11(Fri)</td>
                        <td><input type="time"/></td>
                        <td><input type="time"/></td>
                        <td><button>Set</button></td>
                    </tr>
                    <tr>
                        <td>9/10(Thr)</td>
                        <td><input type="time"/></td>
                        <td><input type="time"/></td>
                        <td><button>Set</button></td>
                    </tr>
                    <tr>
                        <td>9/9(Wed)</td>
                        <td><input type="time"/></td>
                        <td><input type="time"/></td>
                        <td><button>Set</button></td>
                    </tr>
                    <tr>
                        <td>9/8(Tue)</td>
                        <td><input type="time"/></td>
                        <td><input type="time"/></td>
                        <td><button>Set</button></td>
                    </tr>
                    <tr>
                        <td>9/7(Mon)</td>
                        <td><input type="time"/></td>
                        <td><input type="time"/></td>
                        <td><button>Set</button></td>
                    </tr>
                </tbody>
            </table>
        </div>,
        document.body
    );
});