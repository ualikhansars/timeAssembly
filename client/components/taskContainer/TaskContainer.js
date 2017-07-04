import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Week from './Week';
import Days from './Days';

import {onClickDayInTheWeek} from '../../actions/daysAction';

class TaskContainer extends React.Component {
    render() {
        return(
            <div className="task-container">
                <div className="row">
                    <div className="col-md-12">
                        <Week onClickDay={this.props.onClickDayInTheWeek}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Days/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        taskInfo: state.taskInfo,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            onClickDayInTheWeek
        }, 
        dispatch
    );
}

export default connect(null, mapDispatchToProps)(TaskContainer);