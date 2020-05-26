import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Navbar = ({ logout }) => {
	return (
		<AppBar color='secondary'>
			<Toolbar>
				<Grid justify='space-between' container spacing={24}>
					<Grid item>
						<Typography variant='h4'>Dashboard</Typography>
					</Grid>
					<Grid item>
						<Button color='primary' onClick={logout} variant='contained'>
							Logout
						</Button>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func.isRequired
};

export default Navbar;
