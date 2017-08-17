import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Day from './Day';

import {getCurrentDayAndTime} from '../../actions/daysAction';

class Days extends React.Component {
    componentDidMount() {
        this.props.getCurrentDayAndTime();
    }
    render() {
        const {chosenDay} = this.props.daysInfo;

        return (
            //  <Day day={currentDay}/>
            <div className="container">
                <Day day={chosenDay}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        daysInfo: state.daysInfo,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            // fetch slots from database
        getCurrentDayAndTime
        }, 
        dispatch
    );
}


export default connect(mapStateToProps, mapDispatchToProps)(Days);