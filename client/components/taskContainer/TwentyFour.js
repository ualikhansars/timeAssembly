import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import HalfAnHour from './HalfAnHour';
import Task from './Task';

import {fetchTasksByDay, 
        removeTask,
        onClickUpdateTask 
        } from '../../actions/taskAction';

class TwentyFour extends React.Component {

    componentDidMount() {
        this.props.fetchTasksByDay(this.props.day);
    }

    componentWillReceiveProps(nextProps) {
       console.log('Next Props', nextProps);
       if(this.props.day != nextProps.day) {
           this.props.fetchTasksByDay(nextProps.day);
       }
    }

    render() {
        const {tasks} = this.props.taskInfo;
        const {loading, loaded, errors} = this.props.taskInfo.tasksRequest;
        let resource = null;

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
                        slot: task.slot,
                        id: task._id
                    }
                    return (
                        <div key={i}>
                            <Task onClickUpdate={this.props.onClickUpdateTask} property={property} removeTask={this.props.removeTask}/>
                        </div>
                    );
            });
        }

        console.log('Twenty Four Hour Resource', resource);
        
        let time = [];
        let min = 0;
        let hour = 0;
        let index=0;
        for(hour=0; hour<24; ++hour) {
            for(let min=0; min<60; min+=30) {
                let pushedMin = String(min);
                let pushedHour = String(hour);
                if(pushedMin == 0) {
                    pushedMin = '00';
                }
                time.push(
                    <HalfAnHour hour={pushedHour} min={pushedMin} key={index}/>
                );
                index++;
            }
            if(min === 60) {
                min = 0;
            };
        }
        return (
            <div className="container">
               {time}
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TwentyFour);