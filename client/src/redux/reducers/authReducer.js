import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, ACCOUNT_AUTHENTICATED } from '../types';

const initialState = {
	authenticated: false,
	accountAuthenticated: false
};

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_AUTHENTICATED:
			return {
				...state,
				authenticated: true
			};
		case ACCOUNT_AUTHENTICATED:
			return {
				...state,
				accountAuthenticated: true
			}
		case SET_UNAUTHENTICATED:
			return {
				...state,
				authenticated: false
			};
		default:
			return state;
	}
}
