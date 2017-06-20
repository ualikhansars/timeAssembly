import {combineReducers} from 'redux';
import displayReducer from './displayReducer';
import slotInfo from './slotReducer';
import addTaskFromSlot from './addTaskReducer';
import createSlot from './createSlotReducer';

const reducers = combineReducers({
    display: displayReducer,
    slots: slotInfo,
    addTask: addTaskFromSlot,
    createSlot: createSlot
});

export default reducers;