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
import { tokenManager } from './helpers/tokenManager';
import UpsertProfile from './components/dashboard/UpsertProfile';
import CreateExperience from './components/dashboard/CreateExperience';
import CreateEducation from './components/dashboard/CreateEducation';
import Profiles from './components/profile/Profiles';
import {UserProfile} from './components/profile/UserProfile';
import Posts from './components/posts/Posts';
import Post from './components/posts/Post';

const App = () => {
	const token = tokenManager.getToken();
	setAuthToken(token);
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
							<Route exact path="/profiles" component={Profiles} />
							<Route exact path="/user-profile/:id" component={UserProfile} />
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
							<PrivateRoute exact path="/posts" component={Posts} />
							<PrivateRoute exact path="/post/:id" component={Post} />
							<PrivateRoute exact path="/create-profile" component={UpsertProfile} />
							<PrivateRoute exact path="/edit-profile" component={UpsertProfile} />
							<PrivateRoute exact path="/create-experience" component={CreateExperience} />
							<PrivateRoute exact path="/create-education" component={CreateEducation} />
						</Switch>
						<Alert />
					</div>
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
