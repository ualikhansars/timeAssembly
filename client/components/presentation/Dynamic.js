import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Dynamic extends React.Component {
    render() {
        let isShowSlots = this.props.display.displaySlots;
        let isShowSettings = this.props.display.displaySettings;
        if(isShowSlots) {
            return(
                <div>
                    <h2>Tasks</h2>
                </div>
            );
        }
        if(isShowSettings) {
            return(
                <h2>Settings</h2>
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