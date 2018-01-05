import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import reducers from './reducers';
import thunk from 'redux-thunk';

import {development} from '../../config/settings';

let store;

if(development) {
  store = createStore(
    reducers,
    applyMiddleware(thunk, logger), 
  );
} else {
  store = createStore(
    reducers,
    applyMiddleware(thunk), 
  );
}

export default store;
