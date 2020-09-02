import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from '../../actions/auth';

const PrivateRoute: React.FC<any> = ({ component: Component, auth: { isAuthenticated, isLoading }, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => (!isAuthenticated ? <Redirect to="/login" /> : <Component {...props} />)}
		/>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { ...authActions })(PrivateRoute);
