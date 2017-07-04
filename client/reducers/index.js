import {combineReducers} from 'redux';
import displayReducer from './displayReducer';
import slotInfo from './slotReducer';
import taskInfo from './taskReducer';
import daysReducer from './daysReducer';

const reducers = combineReducers({
    display: displayReducer,
    slotInfo: slotInfo,
    taskInfo: taskInfo,
    daysInfo: daysReducer
});

export default reducers;