import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Slots from './Slots';
import Settings from './Settings';
import UpdateTaskForm from './UpdateTaskForm';


class Dynamic extends React.Component {
    render() {
        let {displaySlots, displaySettings, showUpdateTaskForm} = this.props.display;
        if(displaySlots) {
            return(
                <Slots/>
            );
        }
        if(displaySettings) {
            return(
                <Settings/>
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
    };
}


export default connect(mapStateToProps, null)(Dynamic);