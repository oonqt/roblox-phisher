import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Navbar from '../layout/Navbar';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AvatarIcon from '@material-ui/icons/PersonRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';

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
                        <Card style={{ marginBottom: 5 }}>
                            <Grid justify='space-between' container>
                                <Grid item>
                                    <AvatarIcon style={{ height: "100%", width: 50, marginLeft: 10 }} />
                                </Grid>
                                <Grid item style={{ margin: "auto", marginLeft: 10, overflow: "hidden" }}>
                                    <Typography variant="h5" style={{ overflow: "hidden", textOverflow: "ellipsis" }}>ajfurjamzjfiwqjelakfkrkrke</Typography>
                                </Grid>
                                <Grid item>
                                    <Tooltip title="Info" placement="top">
                                        <IconButton  style={{ width: "100%", height: '100%' }}>
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item>
                                    <Tooltip title="Delete" placement="top">
                                        <IconButton style={{ width: "100%", height: '100%' }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Card>
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