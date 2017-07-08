import React from 'react';
import PropTypes from 'prop-types';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {onChooseTime} from '../../actions/taskAction';

class HalfAnHour extends React.Component {
    render() {
        let {hour, min} = this.props;
        return (
            <div className="row">
                <div className="col-md-2">
                         {hour}:{min}
                </div>
                <div className="col-md-10">
                    <div onClick={() => this.props.onChooseTime(hour, min)} className="taskInput">
                        Task
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            onChooseTime
        }, 
        dispatch
    );
}

HalfAnHour.PropTypes = {
    hour: PropTypes.string.isRequired,
    min: PropTypes.string.isRequired,
    onChooseTime: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(HalfAnHour);