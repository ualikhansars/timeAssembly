import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import {getCurrentDate} from '../../../../../utils/getCurrentDate';

import 'react-datepicker/dist/react-datepicker.css';
// CSS Modules, react-datepicker-cssmodules.css
//import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class CreateSlotForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: '',
            title: '',
            category: '',
            total: 1,
            free: 1,
            temporary: false,
            dueDate: moment(),
            userId: this.props.userInfo.user.id
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

    handleChange(date) {
        this.setState({
          dueDate: date
        });
    }

    onSubmit(e) {
        e.preventDefault();
        // make free attribute equals to total
        let total = this.state.total;
        let updatedSlot = Object.assign({}, this.state, {
            free: total
        });
        if(!this.state.title) {
            this.setState({
                errors: 'Title cannot be blank'
            });
        }
        else if(this.state.title.length > 120) {
            this.setState({
                errors: 'Title cannot be more than 120 characters long'
            });
        }
        else if(!this.state.category) {
            this.setState({
                errors: 'Category cannot be blank'
            });
        }
        else if(this.state.category.length > 120) {
            this.setState({
                errors: 'Category cannot be more than 120 characters long'
            });
        }
        else if(this.state.total <= 0) {
            this.setState({
                errors: 'Total should be more than 0'
            });
        } 
        else if(this.state.total > 40) {
            this.setState({
                errors: 'Total cannot be more than 40'
            });
        }
        else if(this.state.temporary && !this.state.dueDate) {
            this.setState({
                errors: 'Please, select dueDate for temporary task'
            });
        } 
        else {
            this.props.createSlot(updatedSlot);
        }
        
    }


    render() { 
        let currentDate = getCurrentDate();
        let dueDate = null;
        let total = <div className="form-group row total">
                        <label htmlFor="total" className="col-md-12">Total:</label>
                        <input value={this.state.total} onChange={this.onChange.bind(this)} type="number" className="form-control col-md-12" id="total" name="total" placeholder="Enter week frequency" />
                    </div>
        // show dueDate if temporary is chosen
        if(this.state.temporary) {

            dueDate = <div className="form-group row">
                            <div className="col-md-12">
                                <p>Due Date:</p>
                            </div>
                            <div className="col-dm-12">
                                <DatePicker
                                    inline
                                    dateFormat="YYYY/MM/DD"
                                    selected={this.state.dueDate}
                                    onChange={this.handleChange.bind(this)}
                                    minDate={moment()}
                                    maxDate={moment().add(365, "days")}
                                    monthsShown={2}
                                >
                                <div style={{color: 'red', textAlign: 'center', marginBottom: '2px'}}>
                                   Task will be removed after this date
                                </div>
                                </DatePicker>
                            </div>
                            
                        </div>
           
            total = <div className="form-group row total">
                        <span className="col-md-12">Total: 1</span>
                    </div>
        }
        return (
             <div className="slots-form createSlot">
                    <div className="createSlotTitleContainer row">
                        <div className="col-md-12 createSlotTitleContainer">
                            <h1 className="createSlotTitle">Create Task</h1>
                        </div>
                    </div>
                    <div className="form-group row title">
                        <label htmlFor="title" className="col-md-12">Title:</label>
                        <input value={this.state.title} onChange={this.onChange.bind(this)} type="text" className="form-control col-md-12" id="title" name="title" placeholder="Study" />
                    </div>
                    <div className="form-group row category">
                        <label htmlFor="category" className="col-md-12">Category:</label>
                        <input value={this.state.category} onChange={this.onChange.bind(this)} type="text" className="form-control col-md-12" id="category" name="category" placeholder="Important" />
                    </div>
                    {total}
                    <div className="form-group row temporary">
                        <label htmlFor="temporary" className="col-md-12">Temporary:</label>
                        <input value={this.state.temporary} onChange={this.onCheckboxChange.bind(this)} type="checkbox" className="col-md-1" id="temporary" name="temporary" value="temporary" />
                    </div>
                    {dueDate}
                    <div className="row errors">
                        <div className="col-md-12">
                            {this.state.errors}
                        </div>
                    </div>
                    <div className="row buttons">
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
        userInfo: state.userInfo
    };
}

CreateSlotForm.propTypes = {
    daysInfo: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired
}

export default connect(mapStateToProps, null)(CreateSlotForm);
