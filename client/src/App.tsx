import React, { Fragment, useEffect } from 'react';
import './App.css';
import { Landing } from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import store from './store';
import { Provider } from 'react-redux';
import Alert from './components/layout/Alert';
import { authActions } from './actions/auth';
import { setAuthToken } from './api/config';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';
import { getToken } from './helprs/getToken';

const token = getToken();
setAuthToken(token);
const App = () => {
	useEffect(() => {
		//@ts-ignore
		store.dispatch(authActions.loadUser());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<Route exact path="/" component={Landing} />
					<div className="container">
						<Switch>
							<Route exact path="/login" component={Login} />
							<Route exact path="/register" component={Register} />
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
						</Switch>
						<Alert />
					</div>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
