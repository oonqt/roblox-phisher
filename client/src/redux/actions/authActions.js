import {
	SET_ERRORS,
	SET_UNAUTHENTICATED,
	LOADING_UI,
	CLEAR_ERRORS,
	SET_AUTHENTICATED,
	ACCOUNT_AUTHENTICATED
} from '../types';
import axios from 'axios';

export const loginAccount = (accountData, history) => (dispatch) => {
	dispatch({ type: LOADING_UI });

	axios
		.post('/api/auth/login', accountData)
		.then(() => {
			dispatch({ type: CLEAR_ERRORS });

			dispatch({
				type: ACCOUNT_AUTHENTICATED
			});
		})
		.catch((err) => {
			console.error(err);

			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};

export const loginAdmin = (key, history) => (dispatch) => {
	dispatch({ type: LOADING_UI });

	axios
		.post('/api/auth/admin', { key })
		.then(() => {
			setAuth(key);

			dispatch({ type: CLEAR_ERRORS });
			dispatch({ type: SET_AUTHENTICATED });

			history.push('/admin');
		})
		.catch((err) => {
			console.error(err);

			dispatch({
				type: SET_ERRORS,
				payload: err.response.data
			});
		});
};

export const logoutAdmin = (history) => (dispatch) => {
	history.push('/login');
	dispatch({ type: SET_UNAUTHENTICATED });
	delete axios.defaults.headers.common['Authorization'];
	localStorage.removeItem('key');
};

const setAuth = (auth) => {
	axios.defaults.headers.common['Authorization'] = auth;
	localStorage.setItem('key', auth);
};
