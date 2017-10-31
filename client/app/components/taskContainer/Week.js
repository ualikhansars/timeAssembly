import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
// styles
import styles from './styles';

class Week extends React.Component {
    render() {
        let mondayStyle, tuesdayStyle, wednesdayStyle, thursdayStyle, fridayStyle, saturdayStyle, sundayStyle;
        if(this.props.daysInfo.chosenDay === 'Monday') {
           mondayStyle = styles.week;
        }
        else if(this.props.daysInfo.chosenDay === 'Tuesday') {
            tuesdayStyle = styles.week;
        }
        else if(this.props.daysInfo.chosenDay === 'Wednesday') {
            wednesdayStyle = styles.week;
        }
        else if(this.props.daysInfo.chosenDay === 'Thursday') {
            thursdayStyle = styles.week;
        }
        else if(this.props.daysInfo.chosenDay === 'Friday') {
            fridayStyle = styles.week;
        }
        else if(this.props.daysInfo.chosenDay === 'Saturday') {
            saturdayStyle = styles.week;
        }
        if(this.props.daysInfo.chosenDay === 'Sunday') {
            sundayStyle = styles.week;
        }
        return(
            <div className="week container">
                <div className="row">
                    <div className="col-md-12">
                        <span onClick={() => this.props.onClickDay('Sunday')} style={sundayStyle}>Su</span>
                        <span onClick={() => this.props.onClickDay('Monday')} style={mondayStyle}>Mo</span>
                        <span onClick={() => this.props.onClickDay('Tuesday')} style={tuesdayStyle}>Tu</span>
                        <span onClick={() => this.props.onClickDay('Wednesday')} style={wednesdayStyle}>We</span>
                        <span onClick={() => this.props.onClickDay('Thursday')} style={thursdayStyle}>Th</span>
                        <span onClick={() => this.props.onClickDay('Friday')} style={fridayStyle}>Fr</span>
                        <span onClick={() => this.props.onClickDay('Saturday')} style={saturdayStyle}>St</span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        taskInfo: state.taskInfo,
        preferences: state.preferences,
        daysInfo: state.daysInfo
    };
}

Week.propTypes = {
    taskInfo: PropTypes.object.isRequired,
    preferences: PropTypes.object.isRequired,
    daysInfo: PropTypes.object.isRequired
}

export default connect(mapStateToProps, null)(Week);