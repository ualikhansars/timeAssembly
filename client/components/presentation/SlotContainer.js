import React from 'react';

class SlotContainer extends React.Component {
    render() {
        return (
             <div className="container-fluid">
                <div className="row">
                <div className="col-md-4 offset-md-4">
                    <span>Tasks</span>
                </div>
                </div>
                <div className="col-md-4 offset-md-4">
                    <button onClick={() => this.props.showSlotForm()} className="btn btn-success">Create Task</button>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {this.props.resource}
                    </div>
                </div>
            </div>
        );
    }
}

export default SlotContainer;