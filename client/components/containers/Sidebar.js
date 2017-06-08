import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import displaySlots from '../../actions/displaySlots';


class Sidebar extends React.Component {
    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <span onClick={() => this.props.displaySlots()}>Profile</span>
                    </div>
                    <div className="col-md-12">
                          <span>Slots</span>
                    </div>
                    <div className="col-md-12">
                         <span>Settings</span>                       
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({displaySlots: displaySlots}, dispatch);
}

export default connect(null, mapDispatchToProps)(Sidebar);