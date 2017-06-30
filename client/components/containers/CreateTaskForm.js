import React from 'react';
import {connect} from 'react-redux';

class CreateTaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.slotInfo.slot.title,
            category: this.props.slotInfo.slot.category,
            description: '',
            duration: 0,
            startTimeHours: null,
            startTimeMinutes: null,
            finishTimeHours: null,
            finishTimeMinutes: null,
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

    onCheckboxChange(event) {
        this.setState({
            temporary: !this.state.temporary
        });
    }

    onSubmit(e) {
        e.preventDefault();
        // make free attribute equals to total
        let total = this.state.total;
        let updatedSlot = Object.assign({}, this.state, {
            free: total
        });
        this.props.createSlot(updatedSlot);
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
                        <input type="number" className="form-control col-sm-5" id="start_time_hours" name="start_time_hours" placeholder="Hours" />:
                        <input type="number" className="form-control col-sm-5" id="start_time_minutes" name="start_time_minutes" placeholder="Minutes" />
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <button onClick={this.onSubmit.bind(this)} className="btn btn-success">Update</button>
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


