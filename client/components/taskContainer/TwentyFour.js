import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import HalfAnHour from './HalfAnHour';
import Task from './Task';

import {fetchTasksByDay, 
        removeTask,
        onClickUpdateTask 
        } from '../../actions/taskAction';

import {timeCalc} from '../../utils/timeCalc';

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
        let timetable = [];

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
            let min = 0;
            let hour = 0;
            let taskAdded = false;
            let index = 0;
            let property = {}
            for(hour=0; hour<24; ++hour) { // every hour
                for(let min=0; min<60; min+=30) { // every 30 minites
                    for(let task of tasks) { 
                        // check if task' startTime equal to iteration hour and minites
                        if(hour == task.startTimeHours && min == task.startTimeMinutes) {
                            property = {
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
                            timetable.push(
                                <Task onClickUpdate={this.props.onClickUpdateTask} property={property} removeTask={this.props.removeTask} key={index}/>
                            );
                            index++;
                            taskAdded = true; 
                        } 
                    } // end for tasks
                    // if task is not added, then add Time component
                    if(!taskAdded) {
                        let pushedMin = String(min);
                        let pushedHour = String(hour);
                        if(pushedMin == 0) {
                            pushedMin = '00';
                        }
                        timetable.push(
                            <HalfAnHour hour={pushedHour} min={pushedMin} key={index}/>
                        );
                        index++;
                    } 
                }
                //if Task has been added, then update hour and minutes
                // change hour and minutes to finishHour and finishMinites of the task
                if(taskAdded) {
                    let {finishHour, finishMin} = timeCalc(hour, min, property.duration);
                    hour = finishHour;
                    min = finishMin;
                }
                // if min is equal to 60 change it to 0
                if(min === 60) {
                    min = 0;
                };
                taskAdded = false;           
            }
    }

        return (
            <div className="container">
                <h6>{this.props.day}</h6>
               {timetable}
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