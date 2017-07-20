import React from 'react';
import PropTypes from 'prop-types';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


import {onClickTime} from '../../actions/daysAction';
import {get12HoursFrom24Hours,} from '../../utils/timeCalc';

class HalfAnHour extends React.Component {

    render() {
        let {hour, min, meridien} = this.props
        let {timeFormat} = this.props.preferences;
        // if 12 o'clock hours and p.m is chosen
        // then convert 24 hours into 12 hours
        let displayHour;
        if(timeFormat === 12) {
            if(meridien === 'p.m') {
                if(hour === '12' && min === '00') {
                    displayHour = '12';
                } else {
                    displayHour = get12HoursFrom24Hours(hour);
                }
            }
            if(meridien === 'a.m') {
                if(hour === '0' && min === '00') {
                    displayHour = '12';
                }
                else {
                    displayHour = hour;
                }
            }
        } else {
            displayHour = hour;
        } 

        return (
            <div onClick={() => this.props.onClickTime(hour, min)} className="row">
                <div className="col-md-4">
                         {displayHour}:{min} {meridien}
                </div>
                <div className="col-md-8">
                    <div className="taskInput">
                        Task
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            onClickTime,
        }, 
        dispatch
    );
}

const mapStateToProps = (state) => {
    return {
        preferences: state.preferences
    };
}

HalfAnHour.PropTypes = {
    hour: PropTypes.string.isRequired,
    min: PropTypes.string.isRequired,
    meridien: PropTypes.string,
    onClickTime: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(HalfAnHour);

