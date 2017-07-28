import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import HalfAnHour from './HalfAnHour';
import Task from './Task';

import {fetchTasksByDay, 
        removeTask,
        onClickUpdateTask 
        } from '../../actions/taskAction';

import {calcFinishTime} from '../../utils/timeCalc';
import {tasksSelectionSort} from '../../utils/sort';

class TwentyFourHours extends React.Component {

    addTimeInterval(timetable, hour, min, index, timeInterval) {
        let updatedTimetable = Object.assign([], timetable);
        if(timeInterval === 30) {
            if(min === 0 || min === 30 || min === 60) {
                let pushedMin = String(min);
                let pushedHour = String(hour);
                if(pushedMin == 0) {
                    pushedMin = '00';
                }
                updatedTimetable.push(
                    <HalfAnHour hour={pushedHour} min={pushedMin} key={index}/>
                );
            }
        }
        if(timeInterval === 60) {
            if(min === 0 || min === 60) {
                let pushedMin = String(min);
                let pushedHour = String(hour);
                if(pushedMin == 0) {
                    pushedMin = '00';
                }
                updatedTimetable.push(
                    <HalfAnHour hour={pushedHour} min={pushedMin} key={index}/>
                );
            }
        }
        if(timeInterval === 15) {
            let pushedMin = String(min);
            let pushedHour = String(hour);
            if(pushedMin == 0) {
            pushedMin = '00';
            }
            updatedTimetable.push(
            <HalfAnHour hour={pushedHour} min={pushedMin} key={index}/>
            );
        }
        return updatedTimetable;
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
                timeInterval,
                startDisplayHour,
                finishDisplayHour
            } = this.props.preferences;
            let taskMin;
            let taskFinishHour = 0;
            let taskFinishMin = 0;
            
            for(hour = startDisplayHour; hour <= finishDisplayHour; ++hour) { // every hour
                for(let min = 0; min < 60; min += 15) { // every 15 minutes
                    console.error('inside min for loop, before tasks: hour = ', hour+':'+min);
                    console.log('taskAdded before tasks', taskAdded);
                    if(hour === 24 && min !== 0) break; // if time more that 24:00 return from the loop
                    if(updatedTasks.length > 0) {
                        for(let i = 0; i < updatedTasks.length; ++i) { 
                            // check if task' startTime equal to iteration hour and minites
                            // then add Task with same startHour instead of time Component
                            if(hour === updatedTasks[i].startTimeHours && min === updatedTasks[i].startTimeMinutes) {
                                property = {
                                    title: updatedTasks[i].title,
                                    category: updatedTasks[i].category,
                                    description: updatedTasks[i].description,
                                    duration: updatedTasks[i].duration,
                                    startTimeHours: updatedTasks[i].startTimeHours,
                                    startTimeMinutes: updatedTasks[i].startTimeMinutes,
                                    finishTimeHours: updatedTasks[i].finishTimeHours,
                                    finishTimeMinutes: updatedTasks[i].finishTimeMinutes,
                                    day: updatedTasks[i].day,
                                    slot: updatedTasks[i].slot,
                                    id: updatedTasks[i]._id
                                }
                                timetable.push(
                                    <Task onClickUpdate={this.props.onClickUpdateTask} property={property} removeTask={this.props.removeTask} key={index}/>
                                );
                                index++;
                                taskAdded = true; 
                                taskMin = min; // save task startTime
                                console.log('task is equal to hour');
                                // updatedTasks.splice(i, 1); // delete task
                                let {finishHour, finishMin} = calcFinishTime(hour, taskMin, property.duration);
                                console.log('finish hour', finishHour + ':' + finishMin);
                                taskFinishHour = finishHour;
                                taskFinishMin = finishMin;
                                // go to 15 minutes back to display finish time
                                if(finishMin === 0) min = 45;
                                if(finishMin === 15) min = 0;
                                if(finishMin === 30) min = 15;
                                if(finishMin === 45) min = 30;
                                if(finishHour > hour) {
                                    // if finishMin is equal to 0, then descrese hour
                                    if(finishMin === 0) finishHour--; 
                                    hour = finishHour;
                                    console.log('finHour > hour, hour and mins', hour + ':'+min);
                                    console.log('taskAdded', taskAdded);
                                    updatedTasks.splice(i, 1);
                                    break;
                                }
                                hour = finishHour;
                                updatedTasks.splice(i, 1); // delete added task from updated tasks
                                console.log('hour and mins', hour + ':'+min);
                                console.log('taskAdded', taskAdded);
                                break;
                                // continue;
                            } 
                        } // end tasks for loop
                        if(!taskAdded) {
                            console.log('task not added');
                            timetable = this.addTimeInterval(timetable, hour, min, index, timeInterval);
                            index++;
                        }
                    } else {
                            console.error('task is less than 0');
                            // prevent adding tasks than ends after 24:00
                            if(taskFinishHour === 24 && taskFinishMin === 0) { 
                                break;
                            }
                            // if finishHour less than current hour
                            // that means task was added
                            if(taskFinishHour !== hour || taskFinishHour === hour && taskFinishMin >= min) { 
                                 timetable = this.addTimeInterval(timetable, hour, min, index, timeInterval);
                                 index++;
                            }
                            
                    }
                    taskAdded = false; // reset taskAdded to false
                } // end of min foor loop
                
                if(min === 60) {
                    min = 0;
                };
            } // end hour for loop
        } 

        return (
            <div className="container">
                <h6>{this.props.day}</h6>
                <h6>24 Hours</h6>
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
        preferences: state.preferences
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TwentyFourHours);