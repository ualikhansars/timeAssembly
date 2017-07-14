import React from 'react';
import {connect} from 'react-redux';

import {getCurrenrDay} from '../../../utils/getCurrentDate';

class CreateSlotForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Lessons',
            category: 'Study',
            total: 1,
            free: 1,
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
        // if temporary is chosen, then set total to 1
        if(this.state.temporary) {
            this.setState({
                total: 1
            });
        }
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
        let currentDate = getCurrenrDay();
        let dueDate = null;
        let total = <div className="form-group row">
                        <label htmlFor="total" className="col-md-12">Total</label>
                        <input value={this.state.total} onChange={this.onChange.bind(this)} type="number" className="form-control col-md-12" id="total" name="total" placeholder="Enter week frequency" />
                    </div>
        // show dueDate if temporary is chosen
        if(this.state.temporary) {
            dueDate = <div className="form-group row">
                        <label htmlFor="dueDate" className="col-md-12">Due Date</label>
                        <input value={this.state.dueDate} onChange={this.onChange.bind(this)} type="date" className="form-control col-md-12" id="dueDate" name="dueDate" min={currentDate}/>
                    </div>
            total = <div className="form-group row">
                        <span className="col-md-12">Total: 1</span>
                    </div>
        }
        return (
             <div className="slots-form">
                     <h1>Create Slot</h1>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-md-12">Title</label>
                        <input value={this.state.title} onChange={this.onChange.bind(this)} type="text" className="form-control col-md-12" id="title" name="title" placeholder="Study" />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="category" className="col-md-12">Category</label>
                        <input value={this.state.category} onChange={this.onChange.bind(this)} type="text" className="form-control col-md-12" id="category" name="category" placeholder="Important" />
                    </div>
                    {total}
                    <div className="form-group row">
                        <label htmlFor="temporary" className="col-md-3">Temporary</label>
                        <input value={this.state.temporary} onChange={this.onCheckboxChange.bind(this)} type="checkbox" className="col-md-3" id="temporary" name="temporary" value="temporary" />
                    </div>
                    {dueDate}
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
        daysInfo: state.daysInfo,
    };
}


