import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchTasks, 
        removeTask,
        onClickUpdateTask 
        } from '../../actions/taskAction';

import Task from './Task';

class Day extends React.Component {

    componentDidMount() {
        this.props.fetchTasks();
    }

    render() {
        const {tasks} = this.props.taskInfo;
        const {loading, loaded, errors} = this.props.taskInfo.tasksRequest;
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
                        id: task._id
                    }
                    return (
                        <div key={i}>
                            <Task onClickUpdate={this.props.onClickUpdateTask} property={property} removeTask={this.props.removeTask}/>
                        </div>
                    );
            });
        }

        return (
            <div>
                {this.props.day}
                {resource}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        taskInfo: state.taskInfo,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            fetchTasks,
            removeTask,
            onClickUpdateTask
        }, 
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Day);