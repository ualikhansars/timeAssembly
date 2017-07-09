import React from 'react';
import {connect} from 'react-redux';

import {timeCalc} from '../../../utils/timeCalc';

class CreateTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.title = this.props.slotInfo.slot.title;
        this.category = this.props.slotInfo.slot.category;
        this.slot = this.props.slotInfo.slot._id;  
        this.day =  this.props.daysInfo.currentDay;
        this.startTimeHours = this.props.taskInfo.startTimeHours;
        this.startTimeMinutes = this.props.taskInfo.startTimeMinutes;        
        this.state = {
            title: this.title,
            category: this.category,
            description: '',
            duration: 30,
            startTimeHours: this.startTimeHours,
            startTimeMinutes: this.startTimeMinutes,
            finishTimeHours: 0,
            finishTimeMinutes: 0,
            day: this.day,
            username: '5954dadd41b4a32e8b86c405',
            slot: this.slot       
        }
    }

    onChange(event) {
        this.setState({
                [event.target.id]: event.target.value
        });
    }

    onSubmit(e) {
         e.preventDefault();
        let startTimeHours = Number(this.state.startTimeHours);
        let startTimeMinutes = this.state.startTimeMinutes;
        let duration = Number(this.state.duration);
        if(this.state.startTimeMinutes == '00') {
            startTimeMinutes = 0;
        } else {
            startTimeMinutes = Number(this.state.startTimeMinutes);
        }
        let {finishHour, finishMin} = timeCalc(startTimeHours, startTimeMinutes, duration);
        let updatedTask = Object.assign({}, this.state, {
            finishTimeHours: finishHour,
            finishTimeMinutes: finishMin,
        });
        console.log('updatedTask', updatedTask);
        this.props.createTask(updatedTask);

    }

    
    render() {
        return (
             <div className="slots-form">
                     <h2>{this.state.title}</h2>
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
                    <div className="row">
                        <div className="col-md-4">
                            <button onClick={this.onSubmit.bind(this)} className="btn btn-success">Create</button>
                        </div>
                        <div className="col-md-4">
                            <button onClick={() => this.props.hideTaskForm()} className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
             </div>   
        );
    }
}

const mapStateToProps = (state) => {
    return {
        slotInfo: state.slotInfo,
        daysInfo: state.daysInfo,
        taskInfo: state.taskInfo
    };
}



export default connect(mapStateToProps, null)(CreateTaskForm);;


