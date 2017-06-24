import {combineReducers} from 'redux';
import displayReducer from './displayReducer';
import slotInfo from './slotReducer';
import addTaskFromSlot from './addTaskReducer';


const reducers = combineReducers({
    display: displayReducer,
    slotInfo: slotInfo,
    addTask: addTaskFromSlot,
});

export default reducers;