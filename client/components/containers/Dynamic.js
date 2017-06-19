import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Slots from './Slots';
import Settings from './Settings';

class Dynamic extends React.Component {
    render() {
        let isShowSlots = this.props.display.displaySlots;
        let isShowSettings = this.props.display.displaySettings;
        if(isShowSlots) {
            return(
                <Slots/>
            );
        }
        if(isShowSettings) {
            return(
                <Settings/>
            );
        } else {
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
        display: state.display
    };
}

export default connect(mapStateToProps, null)(Dynamic);