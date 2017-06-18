import {combineReducers} from 'redux';
import displayReducer from './displayReducer';
import slotInfo from './slotReducer';

const reducers = combineReducers({
    display: displayReducer,
    slots: slotInfo
});

export default reducers;