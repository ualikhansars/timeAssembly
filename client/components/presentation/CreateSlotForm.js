import React from 'react';

//import axios from 'axios';

class CreateSlotForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Lessons',
            category: 'Study',
            total: 0,
            free: 0,
            temporary: false,
            dueDate: '',
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
                    <div className="form-group row">
                        <label htmlFor="title" className="col-md-12">Title</label>
                        <input value={this.state.title} onChange={this.onChange.bind(this)} type="text" className="form-control col-md-12" id="title" name="title" placeholder="Study" />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="category" className="col-md-12">Category</label>
                        <input value={this.state.category} onChange={this.onChange.bind(this)} type="text" className="form-control col-md-12" id="category" name="category" placeholder="Important" />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="total" className="col-md-12">Total</label>
                        <input value={this.state.total} onChange={this.onChange.bind(this)} type="number" className="form-control col-md-12" id="total" name="total" placeholder="Enter week frequency" />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="temporary" className="col-md-3">Temporary</label>
                        <input value={this.state.temporary} onChange={this.onCheckboxChange.bind(this)} type="checkbox" className="col-md-3" id="temporary" name="temporary" value="temporary" />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="dueDate" className="col-md-12">Due Date</label>
                        <input value={this.state.dueDate} onChange={this.onChange.bind(this)} type="date" className="form-control col-md-12" id="dueDate" name="dueDate" placeholder="By what date this task has to be finished" />
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



export default CreateSlotForm;