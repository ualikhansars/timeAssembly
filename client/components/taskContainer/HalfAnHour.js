import React from 'react';
import PropTypes from 'prop-types';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Task from './Task';

import {onChooseTime, onClickTime} from '../../actions/daysAction';
import {displaySlots} from '../../actions/displayAction';


class HalfAnHour extends React.Component {

    render() {
        let {hour, min} = this.props;
        return (
            <div onClick={() => this.props.onClickTime(hour, min)} className="row">
                <div className="col-md-2">
                         {hour}:{min}
                </div>
                <div className="col-md-10">
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
            onChooseTime,
            onClickTime,
            displaySlots
        }, 
        dispatch
    );
}

HalfAnHour.PropTypes = {
    hour: PropTypes.string.isRequired,
    min: PropTypes.string.isRequired,
    onChooseTime: PropTypes.func.isRequired,
    displaySlots: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(HalfAnHour);