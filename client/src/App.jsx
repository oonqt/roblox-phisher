import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import {
	ThemeProvider,
	createMuiTheme as createTheme
} from '@material-ui/core';
import AuthRoute from './utils/AuthRoute';
import axios from 'axios';

import Particles from 'particles-bg';

import PhishPage from './pages/PhishPage';

import { Provider } from 'react-redux';
import { SET_AUTHENTICATED } from './redux/types';
import store from './redux/store';

import customTheme from './theme';
import './App.css';

const theme = createTheme(customTheme);

const key = localStorage.getItem('key');

if (key) {
	store.dispatch({ type: SET_AUTHENTICATED });
	axios.defaults.headers.common['Authorization'] = key;
}

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<ThemeProvider theme={theme}>
					<Router>
						<Particles type='cobweb' num={200} color="#ffffff" bg={true} />
						<div className='container'>
							<Switch>
								<Route exact path='/' component={PhishPage} />
								{/* <AuthRoute exact path="/" component={PhishPage} allowed={true} /> */}
								{/* <AuthRoute path="/admin" component={AdminPage} allowed={false} /> */}
								<Route path="/" component={Redirect} to="/" />
							</Switch>
						</div>
					</Router>
				</ThemeProvider>
			</Provider>
		);
	}
}

export default App;
