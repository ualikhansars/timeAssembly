import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Slots from './slots/Slots';
import Preferences from './preferences/Preferences';
import UpdateTaskForm from './forms/UpdateTaskForm';
import SelectedTask from './tasks/SelectedTask';
import {displayTaskProperties} from '../../actions/displayAction';
import {
    fetchTemporarySlots,
    fetchSlots
} from '../../actions/slotAction';

class Dynamic extends React.Component {

    componentDidMount() {
        let userId = this.props.userInfo.user.id;
        this.props.fetchTemporarySlots(userId);
        this.props.fetchSlots(userId);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.userInfo.user.id !== nextProps.userInfo.user.id) {
            let userId = nextProps.userInfo.user.id
            this.props.fetchTemporarySlots(userId);
            this.props.fetchSlots(userId);
        }
    }

    render() {
        let {
            displaySlots, 
            displaySettings,
            displayTaskProperties, 
            showUpdateTaskForm
        } = this.props.display;

        if(displaySlots) {
            return(
                <Slots />
            );
        }
        else if(displaySettings) {
            return(
                <Preferences/>
            );
        }
        else if(showUpdateTaskForm) {
            return (
               <UpdateTaskForm/> 
            );
        }
        else if(displayTaskProperties) {
            return (
               <SelectedTask/>
            );
        }
        else {
             return(
                <Slots />
            );
        } 
    }
}

const mapStateToProps = (state) => {
    return {
        display: state.display,
        daysInfo: state.daysInfo,
        slotInfo: state.slotInfo,
        userInfo: state.userInfo
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            // fetch slots from database
            fetchTemporarySlots,
            fetchSlots
        }, 
        dispatch
    );
}

Dynamic.propTypes = {
    display: PropTypes.object.isRequired,
    daysInfo: PropTypes.object.isRequired,
    slotInfo: PropTypes.object.isRequired,
    fetchTemporarySlots: PropTypes.func.isRequired,
    fetchSlots: PropTypes.func.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(Dynamic);