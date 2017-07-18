import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {twentyFourHours} from '../../../utils/vars';

// import actions
import {
    changeStartDisplayHour,
    changeFinishDisplayHour
} from '../../../actions/preferencesAction';

class ScheduleTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startHour: '',
            finishHour: ''
        }
    }
    onChangeStartTime(event) {
        this.setState({
                [event.target.id]: event.target.value
        });

        this.props.changeStartDisplayHour(event.target.value);
        
        console.log('On Change', this.state);
    }

    onChangeFinishTime(event) {
        this.setState({
                [event.target.id]: event.target.value
        });
        this.props.changeFinishDisplayHour(event.target.value);
        console.log('On Change', this.state);
    }

    render() {
        let startHour = twentyFourHours.map((hour, i) => {
            let stringHour = 'hours';
            if(hour == 1) stringHour = 'hour';
            return <option value={hour} key={i}>{hour} {stringHour}</option> 
        });
        let finishHour = twentyFourHours.map((hour, i) => {
            let stringHour = 'hours';
            if(hour == 1) stringHour = 'hour';
            return <option value={hour} key={i}>{hour} {stringHour}</option> 
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-2">
                        <h5>Schedule Time</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <span>Start Hour</span>
                        <select value={this.state.startHour} 
                            id="startHour" 
                            onChange={this.onChangeStartTime.bind(this)}
                            name="startHour">
                            {startHour}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <span>Finish Hour</span>
                        <select value={this.state.finishHour} 
                            id="finishHour" 
                            onChange={this.onChangeFinishTime.bind(this)}
                            name="finishHour">
                            {finishHour}
                        </select> 
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        preferences: state.preferences,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            changeStartDisplayHour,
            changeFinishDisplayHour
        }, 
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleTime);