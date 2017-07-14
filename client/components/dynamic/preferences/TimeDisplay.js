import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// import actions
import {
    ChangeToTwentyFourHoursFormat,
    ChangeToTwelveHoursFormat
} from '../../../actions/preferencesAction';

class TimeDisplay extends React.Component {
    render() {

            // display On or Off if depends of which
            // time Format is switched
            let twentyFourOn = 'On';
            let twelveOn = 'On'
            if(this.props.preferences.twentyFourHoursFormat) {
                twentyFourOn = 'On';
                twelveOn = 'Off';
            } else {
                twentyFourOn = 'Off';
                twelveOn = 'On'
            }
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-offset-4">
                            <h5>Time Display</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <label htmlFor="twentyFour">24 hours</label>
                        </div>
                        <div className="col-md-4">
                           <span onClick={() => this.props.twentyFour()}>{twentyFourOn}</span>
                        </div>
                        <div className="col-md-8">
                             <label htmlFor="twelve">12 hours</label>
                        </div>
                        <div className="col-md-4">
                            <span onClick={() => this.props.twelve()}>{twelveOn}</span>          
                        </div>
                    </div>
                </div>
            );
            
    }
}

const mapStateToProps = (state) => {
    return {
        preferences: state.preferences,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            twentyFour: ChangeToTwentyFourHoursFormat,
            twelve: ChangeToTwelveHoursFormat
        }, 
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeDisplay);