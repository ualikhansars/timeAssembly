import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchSlots} from '../../actions/fetchSlotAction';
import {addTask} from '../../actions/taskAction';
import {onClickUpdateSlot, fetchSlotById, removeSlot, createSlot, showUpdateSlotForm, showSlotForm, hideSlotForm, showCreateTaskForm} from '../../actions/slotAction';

import Slot from '../presentation/Slot';

class SlotContainer extends React.Component {
        
    componentDidMount() {
        this.props.fetchSlots();
    }

    render() {
        const {slots, showCreateSlotForm} = this.props.slotInfo;
        const {loading, loaded, errors} = this.props.slotInfo.slotsRequest;
        let resource = null;
        
        // when data is loading
        if(loading) {
            return(
                <div>loading</div>
            );
        }

        // if errors occurs
        if(errors) {
            return(
                <div className="container-fluid">
                    <div>Errors</div>
                    <div>{errors}</div>
                </div>
            );
        }

        // when data loaded
        // display every slots
        if(loaded) {
                 resource = slots.map((slot, i) => {
                    let property = {
                        title: slot.title,
                        category: slot.category,
                        total: slot.total,
                        free: slot.free,
                        tempotary: slot.temporary,
                        dueDate: slot.dueDate,
                        id: slot._id
                    }
                    return (
                        <div key={i}>
                            <Slot showTaskForm={this.props.showCreateTaskForm} fetchSlot={this.props.fetchSlotById} removeSlot={this.props.removeSlot} addTask={this.props.addTask} property={property}/>
                        </div>
                    );
            });
        }
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
                        {resource}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // slots info
        slotInfo: state.slotInfo,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            // fetch slots from database
            fetchSlots,
            addTask,
            showSlotForm,
            hideSlotForm,
            removeSlot,
            showUpdateSlotForm,
            createSlot,
            fetchSlotById,
            showCreateTaskForm
        }, 
        dispatch
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(SlotContainer);