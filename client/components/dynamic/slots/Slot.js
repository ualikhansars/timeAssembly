import React from 'react';

class Slot extends React.Component {
    render() {
        let {startTimeHours, startTimeMinutes} = this.props.slotProperty.timeAndDayProperty;
        let addButton = null;
        let {
            id,
            title, 
            category, 
            total,
            free,
            dueDate,
        } = this.props.slotProperty.slotAttr;
        // if time is chosen and there are free tasks, then show the add button
        if(startTimeHours && startTimeMinutes && free > 0) {
            addButton = <div className="col-md-4">
                        <button onClick={() => this.props.slotProperty.addTask(this.props.slotProperty.slotAttr.id)} className="btn btn-success">
                            Add to {this.props.slotProperty.timeAndDayProperty.chosenDay} {startTimeHours}:{startTimeMinutes}
                        </button>
                        </div>
        }
        return (
            <div className="container-fluid"> 
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <span>{title}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span>Category: {category}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <span>Total: {total}</span>
                    </div>
                    <div className="col-md-6">
                        <span>Free: {free}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span>Due Date: {dueDate}</span>
                    </div>
                </div>
                <div className="row">
                    {addButton}
                     <div className="col-md-4">
                            <button onClick={() => this.props.slotProperty.fetchSlot(id)} className="btn btn-info">Edit</button>
                        </div>
                    <div className="col-md-4">
                        <button onClick={() => this.props.slotProperty.removeSlot(id)} className="btn btn-danger">Remove</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Slot;