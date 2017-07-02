import React from 'react';

class Task extends React.Component {
    render() {
        return (
            <div className="container-fluid"> 
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <span>{this.props.property.title}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span>Category: {this.props.property.category}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span>Description: {this.props.property.description}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                         <span>Duration: {this.props.property.duration} mins</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span>Start Time: {this.props.property.startTimeHours}:{this.props.property.startTimeMinutes}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span>Finish Time: {this.props.property.finishTimeHours}:{this.props.property.finishTimeMinutes}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span>Day: {this.props.property.day}</span>
                    </div>
                </div>
                <div className="row">
                     <div className="col-md-6">
                        <button onClick={() => this.props.onClickUpdate(this.props.property.id)} className="btn btn-info">Edit</button>
                    </div>
                    <div className="col-md-6">
                        <button onClick={() => this.props.removeTask(this.props.property.id)} className="btn btn-danger">Remove</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Task;