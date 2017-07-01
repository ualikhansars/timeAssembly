import {combineReducers} from 'redux';
import displayReducer from './displayReducer';
import slotInfo from './slotReducer';
import taskInfo from './taskReducer';


const reducers = combineReducers({
    display: displayReducer,
    slotInfo: slotInfo,
    taskInfo: taskInfo,
});

export default reducers;