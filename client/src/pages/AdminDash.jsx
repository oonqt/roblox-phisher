import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Navbar from '../layout/Navbar';

import { connect } from 'react-redux';
import { deleteAccount, getAccounts } from '../redux/actions/accountActions';
import { logoutAdmin } from '../redux/actions/authActions';

class AdminDash extends Component {
    render() {
        return (
            <Navbar logoutAdmin={this.props.logoutAdmin} />
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