import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addTask} from '../../../actions/taskAction';
import {
        fetchSlots,
        onClickUpdateSlot, 
        removeSlot, 
        createSlot, 
        showUpdateSlotForm, 
        showCreateSlotForm, 
        hideSlotForm,
    } from '../../../actions/slotAction';

import Slot from './Slot';

class SlotContainer extends React.Component {
        
    componentDidMount() {
        this.props.fetchSlots();
    }

    render() {
        const {slots} = this.props.slotInfo;
        const {loading, loaded, errors} = this.props.slotInfo.slotsRequest;
        let resource = null;
        let {startTimeHours, startTimeMinutes} = this.props.taskInfo;
        let {chosenDay} = this.props.daysInfo;
        // Properties that will be displayed in AddButton in Slot Component
        let timeAndDayProperty = {
            startTimeHours,
            startTimeMinutes,
            chosenDay
        }

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
                    let slotAttr = {
                        title: slot.title,
                        category: slot.category,
                        total: slot.total,
                        free: slot.free,
                        tempotary: slot.temporary,
                        dueDate: slot.dueDate,
                        id: slot._id
                    }
                    // all properties that will be displayed in Task Component
                    let slotProperty = {
                        timeAndDayProperty,
                        fetchSlot: this.props.onClickUpdateSlot,
                        removeSlot: this.props.removeSlot,
                        addTask: this.props.addTask,
                        slotAttr,

                    }
                    return (
                        <div key={i}>
                            <Slot slotProperty={slotProperty}/>
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
                    <button onClick={() => this.props.showCreateSlotForm()} className="btn btn-success">Create Task</button>
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
        daysInfo: state.daysInfo,
        taskInfo: state.taskInfo
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            // fetch slots from database
            fetchSlots,
            addTask,
            showCreateSlotForm,
            hideSlotForm,
            removeSlot,
            showUpdateSlotForm,
            createSlot,
            onClickUpdateSlot,
        }, 
        dispatch
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(SlotContainer);