import React from 'react';

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
                <div className="row timeInterval">
                    <TimeInterval/>
                </div>
                <div className="row scheduleTime">
                    <ScheduleTime/>
                </div>
            </div>
        );
    }
}

export default Preferences;