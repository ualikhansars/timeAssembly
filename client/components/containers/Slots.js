import React from 'react';

import CreateSlotForm from '../presentation/CreateSlotForm';
import SlotContainer from '../containers/SlotContainer';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showSlotForm, hideSlotForm, createSlot} from '../../actions/slotAction';


class Slots extends React.Component {
    render() {
        const {showCreateSlotForm} = this.props.slotInfo;

        // if createSlot button has been clicked, CreateSlotForm will appear
        if(showCreateSlotForm) {
            return (
                <CreateSlotForm hideSlotForm={this.props.hideSlotForm} createSlot={this.props.createSlot}/>  
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
        // slots info
        slotInfo: state.slotInfo,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            // fetch slots from database
            showSlotForm,
            hideSlotForm,
            createSlot
        }, 
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Slots);