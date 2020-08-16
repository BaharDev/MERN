import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { alertActions, ActionMessage } from '../../actions/alert';
import { authActions } from '../../actions/auth';

export type RegisterProps = {
	setAlert(message: string, alertType: string): ActionMessage;
	removeAlerts(): ActionMessage;
	registerUser(email: string, name: string, password: string): Promise<void>;
	isAuthenticated: boolean;
};
const Register: React.SFC<RegisterProps> = (props) => {
	const { setAlert, removeAlerts, registerUser, isAuthenticated } = props;
	const schema = yup.object().shape({
		name: yup.string().required('Name is required'),
		email: yup.string().email('Please enter the correct email').required(),
		password: yup.string().min(6).required(),
		confirmPassword: yup.string().min(6).required(),
	});
	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(schema),
	});

	if (isAuthenticated) {
		return <Redirect to="/dashboard" />;
	}

	const onHandleSubmit: any = async (d: any) => {
		removeAlerts();
		if (d.confirmPassword !== d.password) {
			setAlert('Passwords do not match', 'danger');
			return;
		} else {
			await registerUser(d.email, d.name, d.password);
		}
	};
	return (
		<Fragment>
			<section className="container">
				<h1 className="large text-primary">Sign Up</h1>
				<p className="lead">
					<i className="fas fa-user" /> Create Your Account
				</p>
				<form className="form" onSubmit={handleSubmit(onHandleSubmit)}>
					<div className="form-group">
						<input type="text" placeholder="Name" name="name" ref={register} />
						{errors.name && <p className="error">{errors.name.message}</p>}
					</div>
					<div className="form-group">
						<input type="email" placeholder="Email Address" ref={register} name="email" />
						<small className="form-text">
							This site uses Gravatar so if you want a profile image, use a Gravatar email
						</small>
						{errors.email && <p className="error">{errors.email.message}</p>}
					</div>
					<div className="form-group">
						<input
							type="password"
							placeholder="Password"
							ref={register({
								maxLength: 6,
							})}
							name="password"
						/>
						{errors.password && <p className="error">{errors.password.message}</p>}
					</div>
					<div className="form-group">
						<input
							type="password"
							placeholder="Confirm Password"
							ref={register({
								maxLength: 6,
							})}
							name="confirmPassword"
						/>
						{errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}
					</div>
					<input type="submit" className="btn btn-primary" value="Register" />
				</form>
				<p className="my-1">
					Already have an account? <Link to="/login">Sign In</Link>
				</p>
			</section>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { ...alertActions, ...authActions })(Register);
