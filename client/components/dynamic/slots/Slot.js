import React from 'react';

class Slot extends React.Component {
    render() {
        let {startTimeHours, startTimeMinutes} = this.props.slotProperty.timeAndDayProperty;
        let addButton = null;
        if(startTimeHours && startTimeMinutes) {
            addButton = <div className="col-md-4">
                        <button onClick={() => this.props.slotProperty.addTask(this.props.slotProperty.slotAttr.id)} className="btn btn-success">
                            Add to {this.props.slotProperty.timeAndDayProperty.currentDay} {startTimeHours}:{startTimeMinutes}
                        </button>
                        </div>
        }
        return (
            <div className="container-fluid"> 
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <span>{this.props.slotProperty.slotAttr.title}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span>Category: {this.props.slotProperty.slotAttr.category}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <span>Total: {this.props.slotProperty.slotAttr.total}</span>
                    </div>
                    <div className="col-md-6">
                        <span>Free: {this.props.slotProperty.slotAttr.free}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span>Due Date: {this.props.slotProperty.slotAttr.dueDate}</span>
                    </div>
                </div>
                <div className="row">
                    {addButton}
                     <div className="col-md-4">
                            <button onClick={() => this.props.slotProperty.fetchSlot(this.props.slotProperty.slotAttr.id)} className="btn btn-info">Edit</button>
                        </div>
                    <div className="col-md-4">
                        <button onClick={() => this.props.slotProperty.removeSlot(this.props.slotProperty.slotAttr.id)} className="btn btn-danger">Remove</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Slot;