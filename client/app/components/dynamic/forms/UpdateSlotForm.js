import React from 'react';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { totalmem } from 'os';

class UpdateSlotForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialTotal: this.props.slotInfo.slot.total,
            title: this.props.slotInfo.slot.title,
            category: this.props.slotInfo.slot.category,
            total: this.props.slotInfo.slot.total,
            free: this.props.slotInfo.slot.free,
            temporary: this.props.slotInfo.slot.temporary,
            dueDate: this.props.slotInfo.slot.dueDate,
            userId: this.props.slotInfo.slot.userId,
            _id: this.props.slotInfo.slot._id
        }
    }

    incrementTotal() {
        if(this.state.total < 40) {
            let updatedTotal = this.state.total + 1;
            this.setState({
               total: updatedTotal
            });
        }
    }

    decrementTotal() {
        if(this.state.total > this.state.initialTotal) {
            let updatedTotal = this.state.total - 1;
            this.setState({
               total: updatedTotal
            });
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
        this.props.updateSlot(updatedSlot);
    }
    render() {
        return (
             <div className="slots-form updateSlot">
                    <div className="row">
                        <div className="col-md-12 updateSlotTitleContainer">
                            <h1>Update Slot</h1>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-md-12 slotTitle">Title</label>
                        <input value={this.state.title} onChange={this.onChange.bind(this)} type="text" className="form-control col-md-12" id="title" name="title" placeholder="Study" />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="category" className="col-md-12 slotCategory">Category</label>
                        <input value={this.state.category} onChange={this.onChange.bind(this)} type="text" className="form-control col-md-12" id="category" name="category" placeholder="Important" />
                    </div>
                    <div className="row">
                                <div className="col-md-4">
                                    <span htmlFor="total" className="slotTotal">Total: {this.state.total}</span>
                                </div>
                                <div className="col-md-4">
                                    <img src="/img/add.png" onClick={() => this.incrementTotal()} className="addBtn" />
                                    <img src="/img/minus.png" onClick={() => this.decrementTotal()} className="minusBtn" />        
                                </div>
                                <div className="col-md-2"></div>
                    </div>
                    <div className="row buttons">
                        <div className="col-md-4">
                            <button onClick={this.onSubmit.bind(this)} className="btn btn-success">Update</button>
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
        slotInfo: state.slotInfo
    };
}

UpdateSlotForm.propTypes = {
    slotInfo: PropTypes.object.isRequired
}



export default connect(mapStateToProps, null)(UpdateSlotForm);