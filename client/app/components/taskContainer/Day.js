import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {
    fetchTasksByDay,
    fetchTasksByUserId, 
    removeTask,
    onClickUpdateTask 
} from '../../actions/taskAction';

import Task from './Task';
import TwentyFourHours from './TwentyFourHours';
import Meridien from './Meridien';

class Day extends React.Component {
    componentDidMount() {
        let userId = this.props.userInfo.user.id;
        this.props.fetchTasksByDay(userId, this.props.day);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.day != nextProps.day || this.props.userInfo.user.id !== nextProps.userInfo.user.id) {
            console.error('nextProps', nextProps);
            this.props.fetchTasksByDay(nextProps.userInfo.user.id, nextProps.day);
        }
    }


    render() {
        const {tasks} = this.props.taskInfo;
        const {loading, loaded, errors} = this.props.taskInfo.tasksRequest;
        let {meridien, timeFormat} = this.props.preferences;
        let display;
        let resource = null;
        // when data is loading
        if(loading) {
            return(
                <div>loading</div>
            );
        }

        // if errors occurs
        if(errors) {
            return(
                <div className="container-fluid">
                    <div>Errors</div>
                    <div>{errors}</div>
                </div>
            );
        }

        // when data loaded
        // display every tasks
        if(loaded) {
            if(timeFormat === 24) {
                display =
                    <div>
                        <TwentyFourHours dayInfo={this.props.day} tasks={tasks}/>
                    </div>  
                    
            }
            if(timeFormat === 12) {
                display = 
                    <div>
                        <TwentyFourHours tasks={tasks}/>
                        <Meridien/>
                    </div>  
            }
        }
      
        return (
            <div className="contaner">
                {display}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        taskInfo: state.taskInfo,
        preferences: state.preferences,
        userInfo: state.userInfo
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            fetchTasksByDay,
            fetchTasksByUserId,
            removeTask,
            onClickUpdateTask
        }, 
        dispatch
    );
}

Day.PropTypes = {
    taskInfo: PropTypes.object.isRequired,
    preferences: PropTypes.object.isRequired,
    fetchTasksByDay: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    onClickUpdateTask: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired,
    fetchTasksByUserId: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Day);