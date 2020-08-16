import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { alertActions, ActionMessage } from '../../actions/alert';
import { profileActions } from './../../actions/profile';
import { Profile } from '../../types/profile';
import { Auth } from '../../reducers/auth';
import { ProfileState } from '../../reducers/profile';
import { Spinner } from './../Spinner';
import { Link } from 'react-router-dom';

type DashboardProps = {
	profile: ProfileState;
	auth: Auth;
	setAlert(message: string, alertType: string): ActionMessage;
	removeAlerts(): ActionMessage;
	getCurrentProfile(): Promise<void>;
};
const Dashboard: React.FC<DashboardProps> = (props) => {
	const { profile: { profile, isLoading }, auth: { user }, getCurrentProfile } = props;
	useEffect(() => {
		getCurrentProfile();
	}, []);
	return (
		<Fragment>
			{isLoading ? (
				<Spinner />
			) : (
				<section className="container">
					<h1 className="large text-primary">Dashboard</h1>
					<p className="lead">
						<i className="fas fa-user" /> Welcome {user.name}
					</p>
					{!profile ? (
						<Fragment>
							<p>You have not yet setup your profile, please add some info.</p>
							<Link to="/create-profile" className="btn btn-primary my-1">
								Create Profile
							</Link>
						</Fragment>
					) : (
						<Fragment>
							<div className="dash-buttons">
								<a href="edit-profile.html" className="btn btn-light">
									<i className="fas fa-user-circle text-primary" /> Edit Profile
								</a>
								<a href="add-experience.html" className="btn btn-light">
									<i className="fab fa-black-tie text-primary" /> Add Experience
								</a>
								<a href="add-education.html" className="btn btn-light">
									<i className="fas fa-graduation-cap text-primary" /> Add Education
								</a>
							</div>

							<h2 className="my-2">Experience Credentials</h2>
							<table className="table">
								<thead>
									<tr>
										<th>{profile.company}</th>
										<th className="hide-sm">Title</th>
										<th className="hide-sm">Years</th>
										<th />
									</tr>
								</thead>
								<tbody>
									{profile &&
										profile.experience.map((e) => {
											return (
												<tr>
													<td>{e.company}</td>
													<td className="hide-sm">{e.title}</td>
													<td className="hide-sm">
														{e.from} - {e.current ? `Current` : e.to}
													</td>
													<td>
														<button className="btn btn-danger">Delete</button>
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>

							<h2 className="my-2">Education Credentials</h2>
							<table className="table">
								<thead>
									<tr>
										<th>School</th>
										<th className="hide-sm">Degree</th>
										<th className="hide-sm">Years</th>
										<th />
									</tr>
								</thead>
								<tbody>
									{profile &&
										profile.education.map((e) => {
											return (
												<tr>
													<td>{e.school}</td>
													<td className="hide-sm">{e.degree}</td>
													<td className="hide-sm">
														{e.from} - {e.current ? `Current` : e.to}
													</td>
													<td>
														<button className="btn btn-danger">Delete</button>
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>

							<div className="my-2">
								<button className="btn btn-danger">
									<i className="fas fa-user-minus" />
									Delete My Account
								</button>
							</div>
						</Fragment>
					)}
				</section>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { ...alertActions, ...profileActions })(Dashboard);
