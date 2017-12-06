import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {addTask} from '../../../actions/taskAction';
import {
        fetchTemporarySlots,
        fetchSlots,
        onClickUpdateSlot, 
        removeSlot, 
        createSlot, 
        showUpdateSlotForm, 
        showCreateSlotForm, 
        hideSlotForm,
    } from '../../../actions/slotAction';
import {getTimeDependsOnTimeFormat} from '../../../utils/timeCalc';
import Slot from './Slot';

class SlotContainer extends React.Component {
        
    componentDidMount() {
        let userId = this.props.userInfo.user.id;
        this.props.fetchTemporarySlots(userId);
        this.props.fetchSlots(userId);
    }

    render() {
        const {slots} = this.props.slotInfo;
        const {loading, loaded, errors} = this.props.slotInfo.slotsRequest;
        let resource = null;
        let {startTimeHours, startTimeMinutes} = this.props.taskInfo;
        let {meridien, timeFormat} = this.props.preferences;
        let {chosenDay} = this.props.daysInfo;
        // get right time depends on timeFormat
        let displayTime = getTimeDependsOnTimeFormat(startTimeHours, startTimeMinutes, timeFormat, meridien);
        // Properties that will be displayed in AddButton in Slot Component
        let timeAndDayProperty = {
            startTimeHours,
            startTimeMinutes,
            displayTime,
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
                        temporary: slot.temporary,
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
             <div className="container-fluid slotContainer">
                <div className="row slotContainerTitle">
                    <div className="col-md-4 offset-md-4">
                        <h4 id="slotContainerTitle">Tasks</h4>
                    </div>
                </div>
                <div className="row createSlotContainer">
                    <div className="col-md-4 offset-md-4">
                        <button onClick={() => this.props.showCreateSlotForm()} className="btn btn-success createSlot">Create Task</button>
                    </div>
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
        taskInfo: state.taskInfo,
        userInfo: state.userInfo,
        preferences: state.preferences
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            // fetch slots from database
            fetchTemporarySlots,
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

SlotContainer.propTypes = {
    slotInfo: PropTypes.object.isRequired,
    daysInfo: PropTypes.object.isRequired,
    taskInfo: PropTypes.object.isRequired,
    preferences: PropTypes.object.isRequired,
    fetchSlots: PropTypes.func.isRequired,
    addTask: PropTypes.func.isRequired,
    showCreateSlotForm: PropTypes.func,
    hideSlotForm: PropTypes.func.isRequired,
    removeSlot: PropTypes.func.isRequired,
    showUpdateSlotForm: PropTypes.func,
    createSlot: PropTypes.func.isRequired,
    onClickUpdateSlot: PropTypes.func.isRequired,
    userInfo: PropTypes.object.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps)(SlotContainer);