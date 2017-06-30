import React from 'react';
import {connect} from 'react-redux';

class CreateTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.slotInfo.slot.title,
            category: this.props.slotInfo.slot.category,
            description: '',
            duration: 30,
            startTimeHours: 0,
            startTimeMinutes: 0,
            finishTimeHours: 0,
            finishTimeMinutes: 0,
            day: '',
            username: '',
            slot: this.props.slotInfo.slot.id        
        }
    }

    onChange(event) {
        this.setState({
                [event.target.id]: event.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        // make free attribute equals to total
        let duration = Number(this.state.duration);
        let finishTimeHours, finishTimeMinutes;
        let startTimeHours = Number(this.state.startTimeHours);
        let startTimeMinutes = Number(this.state.startTimeMinutes);
        let finishHours = startTimeHours;
        let finishMinutes = startTimeMinutes;
        console.log('FinishTimeCount', finishHours, finishMinutes);
        console.log('duration', duration);
        if(duration < 60) {
            let addition = startTimeMinutes + duration; // 80 or 30
            console.log('addition', addition);
            if(addition === 60) {
                finishHours++;
                finishMinutes = 0;
            }
            if(addition < 60) { // 30
                finishTimeMinutes = startTimeMinutes + duration;
            }  
            if(addition > 60) { // 80
               let balance = startTimeMinutes - duration;
               console.log('balance', balance);
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
            finishTimeMinutes: finishMinutes
        });
        //this.props.createSlot(updatedSlot);
    }
    render() {
        return (
             <div className="slots-form">
                     <h1>Create Task</h1>
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
                            <button onClick={this.onSubmit.bind(this)} className="btn btn-success">Create</button>
                        </div>
                        <div className="col-md-4">
                            <button onClick={() => this.props.hideSlotForm()} className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
             </div>   
        );
    }
}

const mapStateToProps = (state) => {
    return {
        slotInfo: state.slotInfo
    };
}



export default connect(mapStateToProps, null)(CreateTaskForm);;


