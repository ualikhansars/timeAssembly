import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import TimeInterval from './TimeInterval';
import Task from './Task';

import {fetchTasksByDay, 
        removeTask,
        onClickUpdateTask 
        } from '../../actions/taskAction';

import {calcFinishTime} from '../../utils/timeCalc';
import {tasksSelectionSort} from '../../utils/sort';

class TwentyFourHours extends React.Component {

    // prepare minite and hour to trasfer to
    // view component
    convertTimeToString(hour, min) {
        let pushedMin = String(min);
        let pushedHour = String(hour);
        if(hour < 10) {
            pushedHour = '0' + pushedHour;
        }
        if(pushedMin == 0) {
            pushedMin = '00';
        }

        return {
            pushedMin,
            pushedHour
        }
    }

    // get task and return its propperty
    addPropertyToTask(task) {
         return {
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
    }
    addTimeInterval(timetable, hour, min, index, timeInterval, meridien) {
        let updatedTimetable = Object.assign([], timetable);
        if(timeInterval === 30) {
            if(min === 0 || min === 30 || min === 60) {
                let {pushedMin, pushedHour} = this.convertTimeToString(hour, min);
                updatedTimetable.push(
                    <TimeInterval hour={pushedHour} min={pushedMin} meridien={meridien} key={index}/>
                );
            }
        }
        if(timeInterval === 60) {
            if(min === 0 || min === 60) {
               let {pushedMin, pushedHour} = this.convertTimeToString(hour, min);
                updatedTimetable.push(
                    <TimeInterval hour={pushedHour} min={pushedMin} meridien={meridien} key={index}/>
                );
            }
        }
        if(timeInterval === 15) {
            let {pushedMin, pushedHour} = this.convertTimeToString(hour, min);
            updatedTimetable.push(
                <TimeInterval hour={pushedHour} min={pushedMin} meridien={meridien} key={index}/>
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
                timeFormat,
                meridien,
                timeInterval,
                startDisplayHour,
                finishDisplayHour
            } = this.props.preferences;
            let taskMin;
            let taskFinishHour = 0;
            let taskFinishMin = 0;
            let startTime, finishTime;

            // logic if 12 o'clock hours was chosen
            if(timeFormat === 12) {
                if(meridien === 'a.m') {
                    if(startDisplayHour < 12) {
                        startTime = startDisplayHour;
                    } else {
                        startTime = 0;
                    }
                    if(finishDisplayHour <= 12) {
                        finishTime = finishDisplayHour;
                    } else {
                        finishTime = 12;
                    }
                }
                if(meridien === 'p.m') {
                    if(startDisplayHour >= 12) {
                        startTime = startDisplayHour;
                    } else {
                        startTime = 12;
                    }
                    if(startDisplayHour > 12) {
                        finishTime = finishDisplayHour;
                    } else {
                        finishTime = 24;
                    }
                }
            } 
            // 24 o'clock hours was chosen
            if(timeFormat === 24) {
                startTime = startDisplayHour;
                finishTime = finishDisplayHour;
            }

            
            for(hour = startTime; hour <= finishTime; ++hour) { // every hour
                for(let min = 0; min < 60; min += 15) { // every 15 minutes
                    if(hour === finishTime && min !== 0) break; // do not display mins after finishTime
                    //if(hour === 24 && min !== 0) break; // if time more that 24:00 return from the loop
                    if(timeFormat === 12 && meridien === 'a.m' && hour === 12 && min !== 0) break; // time is more than 12:00 for 12 hours format
                    if(updatedTasks.length > 0) {
                        for(let i = 0; i < updatedTasks.length; ++i) { 
                            // check if task' startTime equal to iteration hour and minites
                            // then add Task with same startHour instead of time Component
                            // if 12 o'clock hours was chosen and task starts before 12 and finishes after 12
                            // it should be displayed after noon
                            if(hour === updatedTasks[i].startTimeHours && min === updatedTasks[i].startTimeMinutes || timeFormat === 12 && meridien === 'p.m' && updatedTasks[i].startTimeHours < 12 && updatedTasks[i].finishTimeHours > startTime) {
                                console.error('updatedTask', updatedTasks[i]);
                                property = this.addPropertyToTask(updatedTasks[i]);
                                timetable.push(
                                    <Task onClickUpdate={this.props.onClickUpdateTask} property={property} removeTask={this.props.removeTask} key={index}/>
                                );
                                index++;
                                taskAdded = true; 
                                //taskMin = min; // save task startTime
                                let {finishHour, finishMin} = calcFinishTime(property.startTimeHours, property.startTimeMinutes, property.duration);
                                taskFinishHour = finishHour; // save finish Time of particular task
                                taskFinishMin = finishMin;
                                console.log('task finish time', taskFinishHour + ':' + taskFinishMin);
                                // go to 15 minutes back to display finish time
                                if(finishMin === 0) min = 45;
                                if(finishMin === 15) min = 0;
                                if(finishMin === 30) min = 15;
                                if(finishMin === 45) min = 30;
                                if(finishHour > hour) {
                                    // if finishMin is equal to 0, then descrese hour
                                    if(finishMin === 0) finishHour--; 
                                    hour = finishHour;
                                    updatedTasks.splice(i, 1);
                                    break;
                                }
                                hour = finishHour;
                                updatedTasks.splice(i, 1); // delete added task from updated tasks
                                break;
                                // continue;
                            } 
                        } // end tasks for loop
                        if(!taskAdded) {
                            timetable = this.addTimeInterval(timetable, hour, min, index, timeInterval, meridien);
                            index++;
                        }
                    } else {
                            // prevent adding tasks than ends after 24:00
                            if(taskFinishHour === 24 && taskFinishMin === 0) { 
                                break;
                            }
                            // if finishHour less than current hour
                            // that means task was added
                            if(taskFinishHour !== hour || taskFinishHour === hour && taskFinishMin >= min) { 
                                 timetable = this.addTimeInterval(timetable, hour, min, index, timeInterval, meridien);
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
                <h6>{this.props.dayInfo}</h6>
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