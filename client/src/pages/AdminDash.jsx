import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Navbar from '../layout/Navbar';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

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
            accounts: { accounts, loading },
            UI: { errors }
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
                    {errors && errors.msg && (
                        <Alert severity="error" style={{ marginRight: 5, marginBottom: 5, marginLeft: 5 }}>{errors.msg}</Alert>
                    )}
                    {loading && errors === null && (
                        <CircularProgress
                            size={75}
                            style={{ marginTop: 10, marginBottom: 25 }}
                            color='primary'
                        />
                    )}
                    <CardContent>
                        

                        {/* <Button variant="contained" fullWidth color="primary" style={{ marginTop: 10 }} onClick={this.updateTable}>Update Accounts</Button> */}
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
