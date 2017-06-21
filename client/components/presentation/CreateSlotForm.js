import React from 'react';

class CreateSlotForm extends React.Component {
    render() {
        return (
             <div className="slots-form">
                <form id="createSlot" method="post">
                    <div className="form-group row">
                        <label htmlFor="title" className="col-md-12">Title</label>
                        <input type="text" className="form-control col-md-12" id="title" name="title" placeholder="Study" />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="category" className="col-md-12">Category</label>
                        <input type="text" className="form-control col-md-12" id="category" name="category" placeholder="Important" />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="total" className="col-md-12">Total</label>
                        <input type="number" className="form-control col-md-12" id="total" name="total" placeholder="Enter week frequency" />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="temporary" className="col-md-3">Temporary</label>
                        <input type="checkbox" className="col-md-3" id="temporary" name="temporary" value="temporary" />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="dueDate" className="col-md-12">Due Date</label>
                        <input type="date" className="form-control col-md-12" id="dueDate" name="dueDate" placeholder="By what date this task has to be finished" />
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <button onClick={this.props.showSlotsForm} className="btn btn-success">Create</button>
                        </div>
                        <div className="col-md-4">
                            <button className="btn btn-danger">Cancel</button>
                        </div>
                    </div>
                </form>
             </div>   
        );
    }
}

export default CreateSlotForm;