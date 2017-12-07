import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {displaySlots} from '../../actions/displayAction';
import {displaySettings} from '../../actions/displayAction';

class Sidebar extends React.Component {
    render() {
        return(
            <div className="container-fluid sidebar">
                <div className="row sidebarItem">
                    <div className="col-md-12 ">
                          <span className="sidebarTask" onClick={() => this.props.displaySlots()}>Tasks</span>
                    </div>
                </div>
                <div className="row sidebarItem">
                    <div className="col-md-12">
                        <span className="sidebarPreferences" onClick={() => this.props.displaySettings()}>Preferences</span>                       
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            displaySlots,
            displaySettings
        }, 
        dispatch
    );
}

Sidebar.propTypes = {
    displaySlots: PropTypes.func.isRequired,
    displaySettings: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(Sidebar);