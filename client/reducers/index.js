import {combineReducers} from 'redux';
import displayReducer from './displayReducer';
import slotInfo from './slotReducer';
import taskInfo from './taskReducer';
import daysReducer from './daysReducer';
import preferencesInfo from './preferencesReducer';

const reducers = combineReducers({
    display: displayReducer,
    slotInfo: slotInfo,
    taskInfo: taskInfo,
    daysInfo: daysReducer,
    preferences: preferencesInfo
});

export default reducers;