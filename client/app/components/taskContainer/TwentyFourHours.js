import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


import Task from './Task';
import PropTypes from 'prop-types';

import {fetchTasksByDay, 
        removeTask,
        onClickUpdateTask 
        } from '../../actions/taskAction';

import {
    calcFinishTime
} from '../../utils/timeCalc';
import {tasksSelectionSort} from '../../utils/sort';
import {
    addTimeInterval,
    addPropertyToTask,
    calculateMin
} from '../../utils/twentyFourHours';
import {logDev} from '../../../../utils/logDev';

class TwentyFourHours extends React.Component {
  
    render() {
        const {tasks} = this.props.taskInfo;
        const {loading, loaded, errors} = this.props.taskInfo.tasksRequest;
        let timetable = [];
        // if(loading) {
        //     return(
        //         <div>loading</div>
        //     );
        // }

        // if errors occurs
        if(errors) {
            return(
                <div className="container-fluid">
                    <div>Error:</div>
                    <div>{errors}</div>
                </div>
            );
        }
        if(loaded) {
        // when data loaded
        // display every tasks
            let unsortedTasks = Object.assign([], tasks);
            let updatedTasks = tasksSelectionSort(unsortedTasks); // sort tasks
            let min = 0;
            let hour = 0;
            let taskAdded = false;
            let index = 0;
            let property = {}
            let {
                timeFormat,
                timeInterval,
                startDisplayHour,
                finishDisplayHour
            } = this.props.preferences;
            let taskMin;
            let taskFinishHour = 0;
            let taskFinishMin = 0;
            let startTime = startDisplayHour; 
            let finishTime = finishDisplayHour;
            
            for(hour = startTime; hour <= finishTime; ++hour) { // every hour
                for(let min = 0; min < 60; min += 15) { // every 15 minutes
                    //console.error('hour:', hour, 'min:', min);
                    if(hour === finishTime && min !== 0) break; // do not display mins after finishTime
                    //if(hour === 24 && min !== 0) break; // if time more that 24:00 return from the loop
                    //if(timeFormat === 12 && meridien === 'a.m' && hour === 12 && min !== 0) break; // time is more than 12:00 for 12 hours format
                    if(updatedTasks.length > 0) {
                        for(let i = 0; i < updatedTasks.length; ++i) { 
                            let currentTask = updatedTasks[i]; 
                            // check if task' startTime equal to iteration hour and minites
                            // then add Task with same startHour instead of time Component
                            if(hour === currentTask.startTimeHours && min === currentTask.startTimeMinutes) {
                                property = addPropertyToTask(updatedTasks[i]);
                                timetable.push(
                                    <Task onClickUpdate={this.props.onClickUpdateTask} property={property} removeTask={this.props.removeTask} task={currentTask} key={index}/>
                                );
                                index++;
                                taskAdded = true; 
                                //taskMin = min; // save task startTime
                                let {finishHour, finishMin} = calcFinishTime(property.startTimeHours, property.startTimeMinutes, property.duration);
                                taskFinishHour = finishHour; // save finish Time of particular task
                                taskFinishMin = finishMin;
                                logDev.default('task finish time ' + taskFinishHour + ':' + taskFinishMin);
                                // go to 15 minutes back to display finish time
                                min = calculateMin(finishMin);
                                if(finishHour > hour) {
                                    // if finishMin is equal to 0, then decrease hour
                                    if(finishMin === 0) finishHour--; 
                                    hour = finishHour;
                                    updatedTasks.splice(i, 1);
                                    break;
                                }
                                hour = finishHour;
                                updatedTasks.splice(i, 1); // delete added task from updated tasks
                                break;
                            } 
                        } // end tasks for loop
                        //console.error('taskAdded:', taskAdded, 'hour:', hour, 'min:', min);
                        if(!taskAdded) {
                            //console.error('task not added hour:', hour, 'min:', min, 'taskAdded:', taskAdded);
                            timetable = addTimeInterval(timetable, hour, min, index, timeInterval);
                            index++;
                        }
                    } else { // no more tasks remained
                            // prevent adding tasks than ends after 24:00
                            if(taskFinishHour === 24 && taskFinishMin === 0) { 
                                break;
                            }
                            logDev.red('add task interval');
                            
                    
                            // if finishHour less than current hour
                            // that means task was added
                            timetable = addTimeInterval(timetable, hour, min, index, timeInterval);
                            index++;
                    }
                    taskAdded = false; // reset taskAdded to false
                } // end of min foor loop
                
                if(min === 60) {
                    min = 0;
                };
            } // end hour for loop
        } 

        return (
            <div className="container day">
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="dayname">{this.props.dayInfo}</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 timetable">
                        {timetable}
                    </div>
                </div>
               
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

TwentyFourHours.propTypes = {
    fetchTasksByDay: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    onClickUpdateTask: PropTypes.func.isRequired,
    taskInfo: PropTypes.object.isRequired,
    preferences: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(TwentyFourHours);