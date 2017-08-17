import React from 'react';
import PropTypes from 'prop-types';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


import {onClickTime} from '../../actions/daysAction';
import {getTimeDependsOnTimeFormat} from '../../utils/timeCalc';

class TimeInterval extends React.Component {

    render() {
        let {hour, min, meridien} = this.props
        let {timeFormat} = this.props.preferences;
        let displayTime = getTimeDependsOnTimeFormat(hour, min, timeFormat, meridien);

        return (
            <div onClick={() => this.props.onClickTime(hour, min)} className="row">
                <div className="col-md-4">
                         {displayTime}
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

TimeInterval.PropTypes = {
    hour: PropTypes.string.isRequired,
    min: PropTypes.string.isRequired,
    meridien: PropTypes.string,
    onClickTime: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeInterval);

