import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { connect } from 'react-redux';
import { loginAdmin } from '../redux/actions/authActions';

import Storage from '@material-ui/icons/Storage';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Transition from '../utils/SlideTransition';


const styles = (theme) => ({
	...theme.globalStyles
});

class AdminLogin extends Component {
    constructor() {
        super();

        this.state = {
            key: "",
            errors: {}
        }
    }

    // todo implement componentDidUpdate?
	UNSAFE_componentWillReceiveProps(props) {
		if (props.UI.errors) {
			this.setState({ errors: props.UI.errors });
		} else {
			this.setState({ errors: {} });
		}
	}

    onSubmit = e => {
        e.preventDefault();

        this.props.loginAdmin(this.state.key, this.props.history);
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {
        const {
			classes,
			UI: { loading }
		} = this.props;
		const { errors } = this.state;

        return (
            <Dialog
                open
                fullWidth
                maxWidth='sm'
                className={classes.dialog}
                TransitionComponent={Transition}
            >
                <Storage className={classes.logo} />
                <DialogTitle disableTypography>
                    <Typography variant='h4'>Admin Login</Typography>
                </DialogTitle>
                <form noValidate onSubmit={this.onSubmit}>
                    <TextField
                        name='key'
                        type='password'
                        label='Key'
                        helperText={errors.key}
                        error={errors.key && true}
                        value={this.state.key}
                        onChange={this.onChange}
                        className={classes.textField}
                        variant='filled'
                        fullWidth
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        color='primary'
                        className={classes.button}
                        disabled={loading}
                        fullWidth
                    >
                        Login
                        {loading && (
                            <CircularProgress size={25} className={classes.progress} />
                        )}
                    </Button>
                    {errors.msg && (
                        <Alert severity="error" className={classes.alert}>{errors.msg}</Alert>
                    )} 
                </form>
            </Dialog>
        )
    }
}

AdminLogin.propTypes = {
    auth: PropTypes.object.isRequired,
    accounts: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    loginAdmin: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    accounts: state.accounts,
    UI: state.UI
});

export default connect(mapStateToProps, { loginAdmin })(withStyles(styles)(AdminLogin));