import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchSlots} from '../../actions/fetchSlotAction';
import {addTask} from '../../actions/taskAction';
import {removeSlot, updateSlot, createSlot, showSlotForm, hideSlotForm, onUpdateSlot} from '../../actions/slotAction';

import Slot from '../presentation/Slot';

class SlotContainer extends React.Component {
        
    componentDidMount() {
        this.props.fetchSlots();
    }

    render() {
        const {loading, loaded, errors, slots, showCreateSlotForm} = this.props.slotInfo;
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
                 resource = slots.resource.map((slot, i) => {
                    let property = {
                        title: slot.title,
                        category: slot.category,
                        total: slot.category,
                        free: slot.free,
                        tempotary: slot.tempotary,
                        dueDate: slot.dueDate,
                    }
                    return (
                        <div key={i}>
                            <Slot updateSlot={this.props.updateSlot} removeSlot={this.props.removeSlot} addTask={this.props.addTask} property={property}/>
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
            updateSlot,
            createSlot,
            onUpdateSlot
        }, 
        dispatch
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(SlotContainer);