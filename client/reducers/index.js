import {combineReducers} from 'redux';
import displayReducer from './displayReducer';
import slotInfo from './slotReducer';
import addTaskFromSlot from './addTaskReducer';
import showSlotForm from './createSlotReducer';

const reducers = combineReducers({
    display: displayReducer,
    slots: slotInfo,
    addTask: addTaskFromSlot,
    createSlot: showSlotForm
});

export default reducers;