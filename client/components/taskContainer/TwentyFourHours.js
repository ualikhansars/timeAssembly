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
                for(let min = 0; min < 60; min += timeInterval) { // depends on timeInterval
                    console.error('inside min for loop, before tasks: hour = ', hour+':'+min);
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
                                if(finishHour > hour) {
                                    taskFinishHour = finishHour;
                                    taskFinishMin = finishMin;
                                    finishHour--;
                                    if(finishMin === 30) {
                                        min = 0
                                    }
                                    hour = finishHour;
                                    min = 30;
                                    console.log('finHour > hour, hour and mins', hour + ':'+min);
                                    console.log('taskAdded', taskAdded);
                                    updatedTasks.splice(i, 1);
                                    break;
                                }
                                if(min > 0) min = finishMin - timeInterval;
                                taskFinishHour = finishHour;
                                taskFinishMin = finishMin;
                                hour = finishHour;
                                updatedTasks.splice(i, 1);
                                console.log('hour and mins', hour + ':'+min);
                                console.log('taskAdded', taskAdded);
                                break;
                                // continue;
                            } 
                        } // end tasks for loop
                        if(!taskAdded) {
                            console.log('task not added');
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
                        console.log('taskFinishHour', taskFinishHour + ':' + taskFinishMin)
                    } else {
                            console.error('task is less than 0');
                            if(taskFinishHour <= hour || taskFinishHour === hour && taskFinishMin < min) {
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
                    // if task is not added, then add Time component
                    // if(!taskAdded && updatedTasks.length > 0) {
                    //     let pushedMin = String(min);
                    //     let pushedHour = String(hour);
                    //     if(pushedMin == 0) {
                    //         pushedMin = '00';
                    //     }
                    //     timetable.push(
                    //         <HalfAnHour hour={pushedHour} min={pushedMin} key={index}/>
                    //     );
                    //     index++;
                    // }
                } // end of min foor loop
                
                // console.log('after min for loop min == ',min) // 0
                //if Task has been added, then update hour and minutes
                // change hour and minutes to finishHour and finishMinites of the task
                // if(taskAdded) {
                //     // console.log('duration', property.duration);
                //     // console.error('startHour', hour + ':'+ min);
                //     // console.log('taskFinishMin', taskMin)
                //     let {finishHour, finishMin} = calcFinishTime(hour, taskMin, property.duration);
                //     // console.error('finishHour', finishHour, 'finishMin',finishMin, 'duration', property.duration);
                //     if(finishHour > hour) {
                //         finishHour--;
                //         hour = finishHour;
                //         min = finishMin;
                //     }
                //     min = finishMin;
                //     hour = finishHour;

                    // add finish hour and min to timetable
                    // before hour incremention

                    // for(let i = min; i < 60; i += timeInterval) {
                    //     // console.log('before hour inc hour and min === ', hour +':'+i);
                    //     let pushedMin = String(i);
                    //     let pushedHour = String(hour);
                    //     if(pushedMin == 0) {
                    //         pushedMin = '00';
                    //     }
                    //     // console.log('pushedHour pushedMin', pushedHour + ':'+pushedMin)
                    //     timetable.push(
                    //         <HalfAnHour hour={pushedHour} min={pushedMin} key={index}/>
                    //     );
                    //     // console.log('TimeInterval is added');
                    //     index++;
                    // }
                    
                    
                //}
                // if min is equal to 60 change it to 0
                if(min === 60) {
                    min = 0;
                };
                taskAdded = false; // reset taskAdded to false
                for(let task of updatedTasks) {
                    console.log(task.startTimeHours + ':' + task.startTimeMinutes);
                }
                // console.log('before end hour for loop', hour+':'+min);           
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