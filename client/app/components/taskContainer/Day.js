import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {fetchTasksByDay, 
        removeTask,
        onClickUpdateTask 
        } from '../../actions/taskAction';

import Task from './Task';
import TwentyFourHours from './TwentyFourHours';
import Meridien from './Meridien';

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
                display =
                    <div>
                        <TwentyFourHours tasks={tasks}/>
                    </div>  
                    
            }
            if(timeFormat === 12) {
                display = 
                    <div>
                        <TwentyFourHours tasks={tasks}/>
                        <Meridien/>
                    </div>  
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

Day.PropTypes = {
    taskInfo: PropTypes.object.isRequired,
    preferences: PropTypes.object.isRequired,
    fetchTasksByDay: PropTypes.func.isRequired,
    removeTask: PropTypes.func.isRequired,
    onClickUpdateTask: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Day);