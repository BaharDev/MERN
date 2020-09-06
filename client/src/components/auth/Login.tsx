import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { alertActions, ActionMessage } from '../../actions/alert';
import { authActions } from '../../actions/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { Redirect } from 'react-router-dom';

export type LoginProps = {
	setAlert(message: string, alertType: string): ActionMessage;
	removeAlerts(): ActionMessage;
	loginUser(email: string, password: string): Promise<void>;
	isAuthenticated: boolean;
};
const Login: React.SFC<LoginProps> = (props) => {
	const { removeAlerts, loginUser, isAuthenticated } = props;
	const schema = yup.object().shape({
		email: yup.string().email('Please enter the correct email').required(),
		password: yup.string().min(6).required(),
	});
	const { register, handleSubmit } = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(schema),
	});

	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	const onHandleSubmit: any = async (d: any) => {
		removeAlerts();
		await loginUser(d.email, d.password);
	};
	return (
		<Fragment>
			<section className="container">
				<h1 className="large text-primary">Sign In</h1>
				<p className="lead">
					<i className="fas fa-user" /> Sign into Your Account
				</p>
				<form className="form" onSubmit={handleSubmit(onHandleSubmit)}>
					<div className="form-group">
						<input type="email" placeholder="Email Address" name="email" ref={register} />
					</div>
					<div className="form-group">
						<input type="password" placeholder="Password" name="password" ref={register} />
					</div>
					<input type="submit" className="btn btn-primary" value="Login" />
				</form>
				<p className="my-1">
					Don't have an account? <a href="register.html">Sign Up</a>
				</p>
			</section>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { ...alertActions, ...authActions })(Login);
