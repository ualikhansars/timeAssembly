import React from 'react';

class Slot extends React.Component {
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
                        <button className="btn btn-success">Add</button>
                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-danger">Remove</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Slot;