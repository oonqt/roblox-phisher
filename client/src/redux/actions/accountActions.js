import { SET_ACCOUNTS, DELETE_ACCOUNT, LOADING_ACCOUNTS, SET_ERRORS, CLEAR_ERRORS } from '../types';
import axios from 'axios';

export const deleteAccount = id => dispatch => {
    axios.delete(`/api/accounts/${id}`)
        .then(() => {
            dispatch({ type: CLEAR_ERRORS });

            dispatch({
                type: DELETE_ACCOUNT,
                payload: id
            });
        })
        .catch(err => {
            console.error(err);

            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

export const getAccounts = (supressLoading) => dispatch => {
    console.log(supressLoading)
    if(supressLoading !== true) dispatch({ type: LOADING_ACCOUNTS });

    axios.get(`/api/accounts`)
        .then(res => {
            dispatch({ type: CLEAR_ERRORS });

            dispatch({
                type: SET_ACCOUNTS,
                payload: res.data
            });
        })
        .catch(err => {
            console.error(err);

            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        })
}