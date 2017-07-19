import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import HalfAnHour from './HalfAnHour';
import Task from './Task';
import AnteMeridien from './AnteMeridien';
import PostMeridien from './PostMeridien';
import Meridien from './Meridien';

import {fetchTasksByDay, 
        removeTask,
        onClickUpdateTask 
        } from '../../actions/taskAction';

import {calcFinishTime} from '../../utils/timeCalc';

class TwelveHours extends React.Component {
    render() {
        const {tasks} = this.props.taskInfo;
        const {loading, loaded, errors} = this.props.taskInfo.tasksRequest;
        let resource = null;
        let tasksUntilNoon = [];
        let tasksAfterNoon = [];
        let {meridien} = this.props.preferences;
        let display;
        
        if(meridien === 'a.m') {
            display = <AnteMeridien/>
        } 
        if(meridien === 'p.m') {
            display = <PostMeridien/>
        }

        return (
            <div>
                {display}
                <Meridien/>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            fetchTasksByDay,
            removeTask,
            onClickUpdateTask
        }, 
        dispatch
    );
}

const mapStateToProps = (state) => {
    return {
        taskInfo: state.taskInfo,
        preferences: state.preferences
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TwelveHours);