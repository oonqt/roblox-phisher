import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer';
import uiReducer from './reducers/uiReducer';
import accountReducer from './reducers/accountReducer';

const initialState = {};

const reducers = combineReducers({
	auth: authReducer,
	UI: uiReducer,
	accounts: accountReducer
});

const store = createStore(
	reducers,
	initialState,
	compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
