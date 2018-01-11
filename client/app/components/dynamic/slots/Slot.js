import React from 'react';

class Slot extends React.Component {
    render() {
        let {startTimeHours, startTimeMinutes, chosenDay, displayTime} = this.props.slotProperty.timeAndDayProperty;
        let addButton = null;
        let date = null;
        let {
            id,
            title, 
            category, 
            total,
            free,
            temporary,
            dueDate,
        } = this.props.slotProperty.slotAttr;
        let slot = this.props.slot;
        // if time is chosen and there are free tasks, then show the add button
        if(startTimeHours && startTimeMinutes && free > 0) {
            addButton = <div className="row addButton">
                            <div className="col-md-12">
                                <img src="/img/arrow.png" onClick={() => this.props.slotProperty.addTask(this.props.slotProperty.slotAttr.id)} className="slotArrow"/>
                                <span className="slotProperty">
                                    Add to {chosenDay} at {displayTime}
                                </span>
                            </div>
                        </div>
        }

        // show dueDate if Task is temporary
        if(temporary) {
            date =  <div className="row">
                            <div className="col-md-12 slotProperty slotDate">
                                <span>Due Date: {dueDate}</span>
                            </div>
                        </div>
        }
        return (
            <div className="container-fluid slot"> 
                <div className="row">
                    <div className="col-md-4 offset-md-4 slotTitleContainer">
                        <span className="slotTitle">{title}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span className="slotProperty slotCategory">Category: {category}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <span className="slotProperty slotTotal">Total: {total}</span>
                    </div>
                    <div className="col-md-6">
                        <span className="slotProperty slotFree">Free: {free}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 addContainer">
                        {date}
                        {addButton}
                    </div>
                    <div className="col-md-6 slotButtons">
                        <img src="/img/edit.png" onClick={() => this.props.slotProperty.fetchSlot(id)} className="editSlot" />
                        <img src="/img/trushBin.png" onClick={() => this.props.slotProperty.removeSlot(slot)} className="removeSlot" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Slot;