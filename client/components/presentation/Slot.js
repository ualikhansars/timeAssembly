import React from 'react';

class Slot extends React.Component {

    onClickUpdate() {
        this.props.fetchSlot(this.props.property.id);
        console.log('SLOT:Fetch slot');
        this.props.showUpdateSlotForm();
        console.log('SLOT:showUpdateSlotForm');
    }
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
                    <div className="col-md-6">
                        <span>Total: {this.props.property.total}</span>
                    </div>
                    <div className="col-md-6">
                        <span>Free: {this.props.property.free}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span>Due Date: {this.props.property.dueDate}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <button onClick={() => this.props.addTask()} className="btn btn-success">Add</button>
                    </div>
                     <div className="col-md-4">
                            <button onClick={() => this.onClickUpdate()} className="btn btn-info">Edit</button>
                        </div>
                    <div className="col-md-4">
                        <button onClick={() => this.props.removeSlot(this.props.property.id)} className="btn btn-danger">Remove</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Slot;