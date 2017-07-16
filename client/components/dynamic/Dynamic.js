import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Slots from './slots/Slots';
import Preferences from './preferences/Preferences';
import UpdateTaskForm from './forms/UpdateTaskForm';

// import actions
import {fetchTemporarySlots} from '../../actions/slotAction';


class Dynamic extends React.Component {

    componentDidMount() {
        this.props.fetchTemporarySlots();
    }

    render() {
        let {displaySlots, displaySettings, showUpdateTaskForm} = this.props.display;
        let {currentDate} = this.props.daysInfo;
        let {temporarySlots} = this.props.slotInfo;

        console.log('currentDate', currentDate);
        console.log('temporarySlots', temporarySlots)
        // this.removeSlotsAfterDueDate(temporarySlots, currentDate);
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
        slotInfo: state.slotInfo
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchTemporarySlots,
        }, 
        dispatch
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(Dynamic);