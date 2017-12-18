import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// import actions
import {
    changeTimeFormat
} from '../../../actions/preferencesAction';

class TimeDisplay extends React.Component {
    render() {
            // display On or Off if depends of which
            // time Format is switched
            let twentyFourOn = 'On';
            let twelveOn = 'On'
            if(this.props.preferences.timeFormat === 24) {
                twentyFourOn = 'On';
                twelveOn = 'Off';
            } else {
                twentyFourOn = 'Off';
                twelveOn = 'On'
            }
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 preferencesItemTitle">
                            <h5>Time Format</h5>
                        </div>
                    </div>
                    <div className="row preferencesAttribute">
                        <div className="col-md-8 preferencesName">
                            <label htmlFor="twentyFour">24 hours</label>
                        </div>
                        <div className="col-md-4 preferencesValue">
                            <span onClick={() => this.props.changeTimeFormat(24, this.props.userInfo.user.id)}>{twentyFourOn}</span>
                        </div>
                    </div>
                    <div className="row preferencesAttribute">
                        <div className="col-md-8 preferencesName">
                            <label htmlFor="twelve">12 hours</label>
                        </div>
                        <div className="col-md-4 preferencesValue">
                            <span onClick={() => this.props.changeTimeFormat(12, this.props.userInfo.user.id)}>{twelveOn}</span>          
                        </div>
                    </div>
                </div>
               
            );
            
    }
}

const mapStateToProps = (state) => {
    return {
        preferences: state.preferences,
        userInfo: state.userInfo
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            changeTimeFormat
        }, 
        dispatch
    );
}

TimeDisplay.propTypes = {
    preferences: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
    changeTimeFormat: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeDisplay);