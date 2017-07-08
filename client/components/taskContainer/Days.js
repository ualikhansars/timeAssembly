import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Day from './Day';
import TwentyFour from './TwentyFour';


class Days extends React.Component {
    render() {
        const {currentDay} = this.props.daysInfo;

        return (
            //  <Day day={currentDay}/>
            <TwentyFour/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        daysInfo: state.daysInfo,
    };
}


export default connect(mapStateToProps, null)(Days);