import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchTasksByDay, 
        removeTask,
        onClickUpdateTask 
        } from '../../actions/taskAction';

import Task from './Task';
import TwentyFourHours from './TwentyFourHours';
import TwelveHours from './TwelveHours';

class Day extends React.Component {
    componentDidMount() {
        this.props.fetchTasksByDay(this.props.day);
    }

    componentWillReceiveProps(nextProps) {
       if(this.props.day != nextProps.day) {
           this.props.fetchTasksByDay(nextProps.day);
       }
    }


    render() {
        const {tasks} = this.props.taskInfo;
        const {loading, loaded, errors} = this.props.taskInfo.tasksRequest;
        let {meridien, timeFormat} = this.props.preferences;
        let display;
        let resource = null;
        // when data is loading
        if(loading) {
            return(
                <div>loading</div>
            );
        }

        // if errors occurs
        if(errors) {
            return(
                <div className="container-fluid">
                    <div>Errors</div>
                    <div>{errors}</div>
                </div>
            );
        }

        // when data loaded
        // display every tasks
        if(loaded) {
            if(timeFormat === 24) {
                display =  <TwentyFourHours tasks={tasks}/>
            }
            if(timeFormat === 12) {
                display = <TwelveHours/>
            }
        }
      
        return (
            <div className="contaner">
                {display}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        taskInfo: state.taskInfo,
        preferences: state.preferences
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            fetchTasksByDay,
            removeTask,
            onClickUpdateTask
        }, 
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Day);