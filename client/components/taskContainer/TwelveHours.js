import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import HalfAnHour from './HalfAnHour';
import Task from './Task';
import AnteMeridien from './AnteMeridien';
import PostMeridien from './PostMeridien';

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

        // when data loaded
        // display every tasks

                 resource = tasks.map((task, i) => {
                    let property = {
                        title: task.title,
                        category: task.category,
                        description: task.description,
                        duration: task.duration,
                        startTimeHours: task.startTimeHours,
                        startTimeMinutes: task.startTimeMinutes,
                        finishTimeHours: task.finishTimeHours,
                        finishTimeMinutes: task.finishTimeMinutes,
                        day: task.day,
                        slot: task.slot,
                        id: task._id
                    }
            });
        
        let {meridien} = this.props.preferences;
        let twelveHours;
        if(meridien === 'a.m') {
            return <AnteMeridien/>
        } 
        return (
            <div>
                 <h6>12 Hours</h6>
                <PostMeridien/>
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