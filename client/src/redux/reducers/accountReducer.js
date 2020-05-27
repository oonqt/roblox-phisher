import { SET_ACCOUNTS, DELETE_ACCOUNT, LOADING_ACCOUNTS } from '../types';

const initialState = {
    accounts: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_ACCOUNTS:
            return {
                ...state,
                loading: true
            }
        case SET_ACCOUNTS:
            return {
                accounts: action.payload,
                loading: false
            }
        case DELETE_ACCOUNT:
            const accountIndex = state.accounts.findIndex(todo => todo.id === action.payload);
            state.accounts.splice(accountIndex, 1);
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}