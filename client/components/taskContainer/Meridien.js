import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {
    changeMeridienToAM, 
    changeMeridienToPM
} from '../../actions/preferencesAction';

class Meridien extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <button onClick={() => this.props.changeMeridienToAM()} className="btn btn-default">A.M</button>
                </div>
                <div className="col-md-6">
                     <button onClick={() => this.props.changeMeridienToPM()} className="btn btn-default">P.M</button>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            changeMeridienToAM, 
            changeMeridienToPM
        }, 
        dispatch
    );
}

export default connect(null, mapDispatchToProps)(Meridien);