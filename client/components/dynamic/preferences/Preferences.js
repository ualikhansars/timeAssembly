import React from 'react';

import TimeDisplay from './TimeDisplay';

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
            </div>
        );
    }
}

export default Preferences;