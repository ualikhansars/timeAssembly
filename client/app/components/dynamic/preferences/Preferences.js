import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {displaySlots} from '../../../actions/displayAction';

import TimeDisplay from './TimeDisplay';
import TimeInterval from './TimeInterval';
import ScheduleTime from './ScheduleTime';

class Preferences extends React.Component {
    render() {
        return(
            <div className="container preferences">
                <div className="row">
                    <div className="col-md-12 preferencesTitleContainer">
                        <h2 className="preferencesTitle">Preferences</h2>
                    </div>
                </div>
                <div className="row timeDisplay">
                    <TimeDisplay/>
                </div>
                <div className="row interval">
                    <TimeInterval/>
                </div>
                <div className="row scheduleTime">
                    <ScheduleTime/>
                </div>
                <div className="row exitButtonContainer">
                    <div className="col-md-12">
                        <button onClick={() => this.props.displaySlots()} className="btn btn-default btn-lg">
                            Exit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            displaySlots
        }, 
        dispatch
    );
}

Preferences.propTypes = {
    displaySlots: PropTypes.func
}

export default connect(null, mapDispatchToProps)(Preferences);