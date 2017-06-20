import React from 'react';

import Slot from '../presentation/Slot';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {fetchSlots, addTask} from '../../actions/slotAction';

class Slots extends React.Component {

    componentDidMount() {
        this.props.fetchSlots();
    }

    render() {
        const {loading, loaded, errors, slots} = this.props.slotsInfo;
        let resource = null;
        console.log('Slots info',slots);
        // when data is loading
        if(loading) {
            return(
                <div>loading</div>
            );
        }

        // if errors occurs
        if(errors) {
            return(
                <div>Errors</div>
            );
        }

        // when data loaded
        // display every slots
        if(loaded) {
                resource = slots.resource.map((slot, i) => {
                    let property = {
                        title: slot.title,
                        category: slot.category,
                        total: slot.category,
                        free: slot.free,
                        tempotary: slot.tempotary,
                        dueDate: slot.dueDate,
                    }
                    return (
                        <div key={i}>
                            <Slot addTask={this.props.addTask} property={property}/>
                        </div>
                    );
            });
        }
        return(
            <div className="container-fluid">
                <div className="row">
                <div className="col-md-4 offset-md-4">
                    <span>Tasks</span>
                </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {resource}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        // slots info
        slotsInfo: state.slots
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            // fetch slots from database
            fetchSlots,
            addTask
        }, 
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Slots);