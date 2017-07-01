import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchTasks} from '../../actions/taskAction';

import Task from '../presentation/Task';

class Days extends React.Component {

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
                            <Task property={property}/>
                        </div>
                    );
            });
        }

        return (
            <div>
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
            fetchTasks
        }, 
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Days);