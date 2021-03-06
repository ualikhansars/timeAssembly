import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Week from './Week';
import Days from './Days';

import {onClickDayInTheWeek} from '../../actions/daysAction';

// preferences
import {
    fetchScheduleTimeByUserId,
    fetchTimeFormatByUserId,
    fetchTimeIntervalByUserId
} from '../../actions/preferencesAction';

class TaskContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.userInfo.user.id;
        if(userId) {
            this.props.fetchScheduleTimeByUserId(userId);
            this.props.fetchTimeFormatByUserId(userId);
            this.props.fetchTimeIntervalByUserId(userId);
        }
        
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.userInfo.user.id !== nextProps.userInfo.user.id) {
            let userId = nextProps.userInfo.user.id
            this.props.fetchScheduleTimeByUserId(userId);
            this.props.fetchTimeFormatByUserId(userId);
            this.props.fetchTimeIntervalByUserId(userId);
        }
    }

    render() {
        return(
            <div className="task-container">
                <div className="row">
                    <div className="col-md-12">
                        <Week onClickDay={this.props.onClickDayInTheWeek}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Days/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        taskInfo: state.taskInfo,
        userInfo: state.userInfo
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            onClickDayInTheWeek,
            fetchScheduleTimeByUserId,
            fetchTimeFormatByUserId,
            fetchTimeIntervalByUserId
        }, 
        dispatch
    );
}

TaskContainer.propTypes = {
    taskInfo: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
    onClickDayInTheWeek: PropTypes.func.isRequired,
    fetchScheduleTimeByUserId: PropTypes.func.isRequired,
    fetchTimeFormatByUserId: PropTypes.func.isRequired,
    fetchTimeIntervalByUserId: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);