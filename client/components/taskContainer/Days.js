import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Day from './Day';



class Days extends React.Component {
    render() {
        const {currentDay} = this.props.daysInfo;

        if(currentDay == 'monday') {
            return (
                <Day day={'monday'}/>
            );
        }
        if(currentDay == 'tuesday') {
            return (
                <Day day={'tuesday'}/>
            );   
        }
        if(currentDay == 'wednesday') {
            return (
                <Day day={'wednesday'}/>
            );  
        }
        if(currentDay == 'thursday') {
            return (
                <Day day={'thursday'}/>
            );  
        }
        if(currentDay == 'friday') {
            return (
                <Day day={'friday'}/>
            ); 
        }
        if(currentDay == 'saturday') {
            return (
                <Day day={'saturday'}/>
            ); 
        }
        if(currentDay == 'sunday') {
            return (
                <Day day={'sunday'}/>
            );
        }
        
        else {
            return (
                <h4>
                    Error: day is not defined
                </h4>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        daysInfo: state.daysInfo,
    };
}


export default connect(mapStateToProps, null)(Days);