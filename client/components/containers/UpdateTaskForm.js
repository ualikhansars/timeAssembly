import React from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {displayNothing} from '../../actions/displayAction';
import {updateTask} from '../../actions/taskAction';

class UpdateTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.title = this.props.taskInfo.task.title;
        this.category = this.props.taskInfo.task.category;
        this.description = this.props.taskInfo.task.description;
        this.duration = this.props.taskInfo.task.duration;
        this.startTimeHours = this.props.taskInfo.task.startTimeHours;
        this.finishTimeHours = this.props.taskInfo.task.startTimeMinutes;
        this.finishTimeMinutes = this.props.taskInfo.task.finishHours;
        this.finishTimeHours = this.props.taskInfo.task.finishTimeMinutes;
        this.day = this.props.taskInfo.task.day;
        this.username = this.props.taskInfo.task.username;
        this.task = this.props.taskInfo.task._id;       
        this.state = {
            title: this.title,
            category: this.category,
            description: this.duration,
            duration: this.duration,
            startTimeHours: this.startTimeHours,
            startTimeMinutes: this.startTimeMinutes,
            finishTimeHours: this.finishTimeHours,
            finishTimeMinutes: this.finishTimeMinutes,
            day: this.day,
            username: this.username,
            _id: this.task       
        }
    }

    onChange(event) {
        this.setState({
                [event.target.id]: event.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        let duration = Number(this.state.duration);
        let finishTimeHours, finishTimeMinutes;
        let startTimeHours = Number(this.state.startTimeHours);
        let startTimeMinutes = Number(this.state.startTimeMinutes);
        let finishHours = startTimeHours;
        let finishMinutes = startTimeMinutes;
        console.log('FinishTimeCount', finishHours, finishMinutes);
        console.log('duration', duration);
        if(duration < 0) {
            duration = 0;
        }
        if(duration < 60) {
            let addition = startTimeMinutes + duration; // 80 or 30
            if(addition === 60) {
                finishHours++;
                finishMinutes = 0;
            }
            if(addition < 60) { // 30
                finishMinutes = startTimeMinutes + duration;
            }  
            if(addition > 60) { // 80
               let balance = startTimeMinutes - duration;
               finishHours++;
               finishMinutes = balance;
            }
        } else { // duration > 60
            let parameter = Math.floor(duration / 60); // 200 / 60 === 3
            let balance = duration % 60;
            finishHours = startTimeHours + parameter;
            finishMinutes = startTimeMinutes + balance;
        }
        let updatedTask = Object.assign({}, this.state, {
            finishTimeHours: finishHours,
            finishTimeMinutes: finishMinutes,
        });
        console.log('updatedTask', updatedTask);
        this.props.updateTask(updatedTask);
    }
    render() {
        return (
             <div className="tasks-form">
                     <h2>Update Task: {this.state.title}</h2>
                     <div>
                        <h4>Category: {this.state.category}</h4>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="description" className="col-md-12">Description</label>
                        <input value={this.state.description} onChange={this.onChange.bind(this)} type="text" className="form-control col-md-12" id="description" name="description" placeholder="What exactly to do" />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="duration" className="col-md-12">Duration</label>
                        <input value={this.state.duration} onChange={this.onChange.bind(this)} type="text" className="form-control col-md-12" id="duration" name="duration" placeholder="Duration of this task in minutes" />
                    </div>
                    <div className="form-group row">
                        <input type="number" onChange={this.onChange.bind(this)} className="form-control col-sm-5" id="startTimeHours" name="startTimeHours" placeholder="Hours" />:
                        <input type="number" onChange={this.onChange.bind(this)} className="form-control col-sm-5" id="startTimeMinutes" name="startTimeMinutes" placeholder="Minutes" />
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <button onClick={this.onSubmit.bind(this)} className="btn btn-success">Update</button>
                        </div>
                        <div className="col-md-4">
                            <button onClick={() => this.props.displayNothing()} className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
             </div>   
        );
    }
}

const mapStateToProps = (state) => {
    return {
        taskInfo: state.taskInfo
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            displayNothing,
            updateTask
        }, 
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTaskForm);