import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import HalfAnHour from './HalfAnHour';
import Task from './Task';

import {fetchTasksByDay, 
        removeTask,
        onClickUpdateTask 
        } from '../../actions/taskAction';

import {
    calcFinishTime,
    get12HoursFrom24Hours
} from '../../utils/timeCalc';

class PostMeridien extends React.Component {
    render() {
        const {tasks} = this.props.taskInfo;
        const {loading, loaded, errors} = this.props.taskInfo.tasksRequest;
        let timetable = [];
        // when data loaded
        // display every tasks
            let min = 0;
            let hour = 0;
            let taskAdded = false;
            let index = 0;
            let property = {}
            let {
                meridien,
                timeInterval,
                startDisplayHour,
                finishDisplayHour
            } = this.props.preferences;

            // set StartTime to start and finish DisplayHour
            // if displayHour > 12
            let startTime, finishTime;
            let show12pm = false;
            if(startDisplayHour < 12) {
                startTime = 1;
                show12pm = true;
            } else {
                startTime = get12HoursFrom24Hours(startDisplayHour);
            }

            if(finishDisplayHour < 12) {
                finishTime = 12;
            } else {
                finishTime = get12HoursFrom24Hours(finishDisplayHour);
            }

            // add 12 p.m start of the day
           if(startTime < 1 || show12pm) {
                timetable.push(
                    <HalfAnHour hour={'12'} min={'00'} meridien={meridien} key={index}/>
                );
                index++;
            }

            for(hour = startTime; hour < finishTime; ++hour) { // every hour
                for(let min=0; min < 60; min += timeInterval) { // depends on timeInterval
                    // console.log('before tasks for loop after min == ', hour+':'+min);
                    for(let task of tasks) { 
                        // check if task' startTime equal to iteration hour and minites
                        // then add Task with same startHour instead of time Component
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
                            // console.log('taskAdded', taskAdded);
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
                            <HalfAnHour hour={pushedHour} min={pushedMin} meridien={meridien} key={index}/>
                        );
                        index++;
                    }
                }
                // console.log('after min for loop min == ',min) // 0
                //if Task has been added, then update hour and minutes
                // change hour and minutes to finishHour and finishMinites of the task
                if(taskAdded) {
                    let {finishHour, finishMin} = calcFinishTime(hour, min, property.duration);
                    console.log('finishHour', finishHour, 'finishMin',finishMin);
                    hour = finishHour;
                    min = finishMin;
                    // add finish hour amd min to timetable
                    // before hour incremention
                    // for(let i = min; i < 60; i+=30) {
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
                }
                // if min is equal to 60 change it to 0
                if(min === 60) {
                    min = 0;
                };
                taskAdded = false;
                // console.log('before end hour for loop', hour+':'+min);           
            }
            // add 11:59 p.m hour without onAddTask function
            timetable.push(
                <div className="row" key={index}>
                <div className="col-md-4">
                         11:59 p.m
                </div>
                <div className="col-md-8">
                    <div className="taskInput">
                        Task
                    </div>
                </div>
            </div>
            );
    


        return (
            <div className="container">
                <h6>P.M</h6>
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

export default connect(mapStateToProps, mapDispatchToProps)(PostMeridien);