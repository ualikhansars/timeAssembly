import React from 'react';

class Task extends React.Component {
    render() {
        console.error('property', this.props.property);
        let {
            title,
            category,
            description,
            duration,
            startTimeHours,
            startTimeMinutes,
            finishTimeHours,
            finishTimeMinutes,
            day,
            slot,
            id
        } = this.props.property;
        let showDescription;
        if(description) {
            showDescription = <div className="row">
                                <div className="col-md-12">
                                    <span>Description: {description}</span>
                                </div>
                            </div>
        }
        console.error('startTimeHour:', startTimeHours, 'startTimeMinutes:', startTimeMinutes);
        console.error('finishTimeHour:', finishTimeHours, 'startTimeMinutes:', finishTimeMinutes);
        if(startTimeHours < 10) {
            startTimeHours = '0' + startTimeHours;
        }
        if(finishTimeHours < 10) {
            finishTimeHours = '0' + finishTimeHours;
        }
        if(startTimeMinutes == 0) startTimeMinutes = '0' + startTimeMinutes;
        if(finishTimeMinutes === 0) finishTimeMinutes = '0' + finishTimeMinutes;
        return (
            <div className="task container">
                <div className="row">
                    <div className="col-md-2 taskTime">
                        <div className="taskStartTime">
                            {startTimeHours}:{startTimeMinutes}
                        </div>
                        <div className="taskFinishTime">
                            {finishTimeHours}:{finishTimeMinutes}
                        </div>
                    </div>
                    <div className="col-md-10 taskContent">
                        <div className="row">
                            <div className="col-md-4 offset-md-4">
                                <span className="taskTitle">{title}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <span>Category: {category}</span>
                                </div>
                            </div>
                        {showDescription}
                        <div className="row">
                            <div className="col-md-12">
                                <span>Duration: {duration} mins</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <img src="/img/edit.png" onClick={() => this.props.onClickUpdate(id)} className="editTask"/>
                                <img src="/img/trushBin.png" onClick={() => this.props.removeTask(id, slot)} className="removeTask" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
                
            
        );
    }
}

export default Task;