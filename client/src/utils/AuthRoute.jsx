import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

const AuthRoute = ({
	component: Component,
	authenticated,
	allowed,
	...props
}) => {
	return (
		<Route
			{...props}
			render={(props) =>
				authenticated ? (
					allowed ? (
						<Component {...props} />
					) : (
						<Redirect to='/admin' />
					)
				) : allowed ? (
					<Redirect to='/login' />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

AuthRoute.propTypes = {
	component: PropTypes.any.isRequired,
	authenticated: PropTypes.bool.isRequired,
	allowed: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
	authenticated: state.auth.authenticated
});

export default connect(mapStateToProps)(AuthRoute);
