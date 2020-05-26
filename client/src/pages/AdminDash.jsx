import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Navbar from '../layout/Navbar';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux';
import { deleteAccount, getAccounts } from '../redux/actions/accountActions';
import { logoutAdmin } from '../redux/actions/authActions';

class AdminDash extends Component {
    logout = () => {
        this.props.logoutAdmin(this.props.history);
    }

    render() {
        return (
            <Fragment>
                <Navbar logout={this.logout} />
                <Card>
                    <CardHeader title="Stolen Accounts" disableTypography component={Typography} variant="h5" />
                    <CardContent>
                    </CardContent>
                </Card>
            </Fragment>
        )
    }
}

AdminDash.propTypes = {
    accounts: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    getAccounts: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    logoutAdmin: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    accounts: state.accounts,
    UI: state.UI
});

const mapActionsToProps = {
    getAccounts,
    deleteAccount,
    logoutAdmin
}

export default connect(mapStateToProps, mapActionsToProps)(AdminDash);