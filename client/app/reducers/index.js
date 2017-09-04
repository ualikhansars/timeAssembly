import {combineReducers} from 'redux';
import displayReducer from './displayReducer';
import slotInfo from './slotReducer';
import taskInfo from './taskReducer';
import daysReducer from './daysReducer';
import preferencesInfo from './preferencesReducer';
import userInfo from './userReducer';

const reducers = combineReducers({
    display: displayReducer,
    slotInfo: slotInfo,
    taskInfo: taskInfo,
    daysInfo: daysReducer,
    preferences: preferencesInfo,
    userInfo: userInfo
});

export default reducers;