import React from 'react';
import PropTypes from 'prop-types';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';


import {onClickTime} from '../../actions/daysAction';


class HalfAnHour extends React.Component {

    render() {
        let {hour, min, meridien} = this.props;
        return (
            <div onClick={() => this.props.onClickTime(hour, min)} className="row">
                <div className="col-md-4">
                         {hour}:{min} {meridien}
                </div>
                <div className="col-md-8">
                    <div className="taskInput">
                        Task
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
            onClickTime,
        }, 
        dispatch
    );
}

HalfAnHour.PropTypes = {
    hour: PropTypes.string.isRequired,
    min: PropTypes.string.isRequired,
    meridien: PropTypes.string,
    onClickTime: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(HalfAnHour);

