import React from 'react'


var Day = React.createClass({
    getInitialState() {
        return {
            workingHour: 8
        };
    },
    toggle() {
        switch (this.state.workingHour) {
            case 0:
                return this.setState({workingHour: 4});
            case 4:
                return this.setState({workingHour: 8});
            default :
                return this.setState({workingHour: 0});
        }
    },
    render() {

        var disabled = !this.state.workingHour;

        return (
            <tr>
                <td><span className={ disabled ? 'disabled' : '' } onClick={this.toggle}>V</span></td>
                <td>{this.props.date}</td>
                <td><input type="time" disabled={disabled}/></td>
                <td><input type="time" disabled={disabled}/></td>
            </tr>
        );
    }
});

export default Day;