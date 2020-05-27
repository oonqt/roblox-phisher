import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';
import Tooltip from '@material-ui/core/Tooltip';

const Navbar = ({ logout, loadAccounts }) => {
	return (
		<AppBar color='secondary'>
			<Toolbar>
				<Grid justify='space-between' container>
					<Grid item>
						<Typography variant='h4'>Dashboard</Typography>
					</Grid>
					<Grid item>
						<Tooltip placement="left" title="Refresh List">
							<IconButton style={{ marginRight: 5 }} onClick={loadAccounts}>
								<ReplayIcon />
							</IconButton>
						</Tooltip>
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
