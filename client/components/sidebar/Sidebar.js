import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {displaySlots} from '../../actions/displayAction';
import {displaySettings} from '../../actions/displayAction';

class Sidebar extends React.Component {
    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <span>Profile</span>
                    </div>
                    <div className="col-md-12">
                          <span onClick={() => this.props.displaySlots()}>Tasks</span>
                    </div>
                    <div className="col-md-12">
                         <span onClick={() => this.props.displaySettings()}>Preferences</span>                       
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