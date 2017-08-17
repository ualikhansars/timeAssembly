import React from 'react';

import TimeDisplay from './TimeDisplay';
import TimeInterval from './TimeInterval';
import ScheduleTime from './ScheduleTime';

class Preferences extends React.Component {
    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-offset-4">
                        <h2>Preferences</h2>
                    </div>
                </div>
                <div className="row">
                    <TimeDisplay/>
                </div>
                <div className="row">
                    <TimeInterval/>
                </div>
                <div className="row">
                    <ScheduleTime/>
                </div>
            </div>
        );
    }
}

export default Preferences;