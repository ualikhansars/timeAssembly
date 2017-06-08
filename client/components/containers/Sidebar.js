import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {displaySlots} from '../../actions/displaySlots';
import {displaySettings} from '../../actions/displaySlots';

class Sidebar extends React.Component {
    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <span>Profile</span>
                    </div>
                    <div className="col-md-12">
                          <span onClick={() => this.props.displaySlots()}>Slots</span>
                    </div>
                    <div className="col-md-12">
                         <span onClick={() => this.props.displaySettings()}>Settings</span>                       
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

export default connect(null, mapDispatchToProps)(Sidebar);