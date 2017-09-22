import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Slots from './slots/Slots';
import Preferences from './preferences/Preferences';
import UpdateTaskForm from './forms/UpdateTaskForm';


class Dynamic extends React.Component {

    render() {
        let {displaySlots, displaySettings, showUpdateTaskForm} = this.props.display;
        let {currentDate} = this.props.daysInfo;
        let {temporarySlots} = this.props.slotInfo;

        if(displaySlots) {
            return(
                <Slots temporarySlots={temporarySlots} currentDate={currentDate} removeSlotsAfterDueDate={this.removeSlotsAfterDueDate}/>
            );
        }
        if(displaySettings) {
            return(
                <Preferences/>
            );
        }
        if(showUpdateTaskForm) {
            return (
               <UpdateTaskForm/> 
            );
        }
        else {
             return(
                <div>
                    <h2>Nothing to show</h2>
                </div>
            );
        } 
    }
}

const mapStateToProps = (state) => {
    return {
        display: state.display,
        daysInfo: state.daysInfo,
        slotInfo: state.slotInfo,
    };
}

Dynamic.propTypes = {
    display: PropTypes.object.isRequired,
    daysInfo: PropTypes.object.isRequired,
    slotInfo: PropTypes.object.isRequired,
}


export default connect(mapStateToProps, null)(Dynamic);