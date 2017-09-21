import React from 'react';
import PropTypes from 'prop-types';

import CreateSlotForm from '../forms/CreateSlotForm';
import UpdateSlotForm from '../forms/UpdateSlotForm';
import CreateTaskForm from '../forms/CreateTaskForm';
import SlotContainer from './SlotContainer';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showSlotForm, hideSlotForm, createSlot, updateSlot} from '../../../actions/slotAction';
import {hideTaskForms, createTask} from '../../../actions/taskAction';
import {removeSlot} from '../../../actions/slotAction';

class Slots extends React.Component {

        componentDidMount() {
            this.removeSlotsAfterDueDate(this.props.temporarySlots, this.props.currentDate);
        }

        // delete slot after due Date
        removeSlotsAfterDueDate(slots, currentDate) {
            for(let slot of slots) {
                if(currentDate > slot.dueDate) {
                    this.props.removeSlot(slot._id);
                }
            }
        }
    render() {
        console.log('currentDate Slots', this.props.currentDate);
        console.log('temporarySlots Slots', this.props.temporarySlots)
        const {displayCreateSlotForm, displayUpdateSlotForm} = this.props.slotInfo;
        const {displayCreateTaskForm} = this.props.taskInfo;
        let {currentDate} = this.props.daysInfo;

        // if createSlot button has been clicked, CreateSlotForm will appear
        if(displayCreateSlotForm) {
            return (
                <CreateSlotForm hideSlotForm={this.props.hideSlotForm} createSlot={this.props.createSlot}/>  
            );
        }
        if(displayUpdateSlotForm) {
            return (
                <UpdateSlotForm hideSlotForm={this.props.hideSlotForm} updateSlot={this.props.updateSlot}/>
            );
        }
        if(displayCreateTaskForm) {
            return (
                <CreateTaskForm hideTaskForm={this.props.hideTaskForms} createTask={this.props.createTask}/>
            );
        }
        else {
            return(
                <SlotContainer showSlotForm={this.props.showSlotForm}/>    
             );
        } 
    } 
}

const mapStateToProps = (state) => {
    return {
        slotInfo: state.slotInfo,
        taskInfo: state.taskInfo,
        daysInfo: state.daysInfo
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            // fetch slots from database
            showSlotForm,
            hideSlotForm,
            createSlot,
            updateSlot,
            hideTaskForms,
            createTask,
            removeSlot
        }, 
        dispatch
    );
}

Slots.propTypes = {
    slotInfo: PropTypes.object.isRequired,
    taskInfo: PropTypes.object.isRequired,
    daysInfo: PropTypes.object.isRequired,
    showSlotForm: PropTypes.func,
    hideSlotForm: PropTypes.func.isRequired,
    createSlot: PropTypes.func.isRequired,
    updateSlot: PropTypes.func.isRequired,
    hideTaskForms: PropTypes.func.isRequired,
    createTask: PropTypes.func.isRequired,
    removeSlot: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Slots);