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
            // tasks.map((task) => {
            //     let property = {
            //         title: task.title,
            //         category: task.category,
            //         description: task.description,
            //         duration: task.duration,
            //         startTimeHours: task.startTimeHours,
            //         startTimeMinutes: task.startTimeMinutes,
            //         finishTimeHours: task.finishTimeHours,
            //         finishTimeMinutes: task.finishTimeMinutes,
            //         day: task.day,
            //         slot: task.slot,
            //         id: task._id
            //     }

            //     // if NotTask add HalfAnHour Component
            //     for(hour=0; hour<24; ++hour) {
            //         for(let min=0; min<60; min+=30) {
            //             // if Task.startHour == hour
            //             if(hour == property.startTimeHours && min == property.startTimeMinutes) {
            //                 timetable.push(
            //                     <Task onClickUpdate={this.props.onClickUpdateTask} property={property} removeTask={this.props.removeTask} key={index}/>
            //                 );
            //                 index++;
            //                 taskAdded = true;
            //             } else {
            //                     let pushedMin = String(min);
            //                     let pushedHour = String(hour);
            //                     if(pushedMin == 0) {
            //                     pushedMin = '00';
            //                     }
            //                     timetable.push(
            //                         <HalfAnHour hour={pushedHour} min={pushedMin} key={index}/>
            //                     );
            //                     index++;
            //                 }
            //         }
            //         // if Task has been added, then update hour and minutes
            //         if(taskAdded) {
            //             let {finishHour, finishMin} = timeCalc(hour, min, property.duration);
            //             hour = finishHour;
            //             min = finishMin;
            //         }
            //         if(min === 60) {
            //             min = 0;
            //         };
            //         taskAdded = false;
            //     }

            // });
              for(hour=0; hour<24; ++hour) {
                    for(let min=0; min<60; min+=30) {
                        for(let task of tasks) {
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
                    if(taskAdded) {
                        let {finishHour, finishMin} = timeCalc(hour, min, property.duration);
                        console.log('task Added');
                        console.log('finishHour', finishHour, 'finishMin', finishMin)
                        hour = finishHour;
                        min = finishMin;
                    }
                    if(min === 60) {
                        min = 0;
                    };
                    taskAdded = false;
                   
              }
        }

        return (
            <div className="container">
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