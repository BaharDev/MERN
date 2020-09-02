import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Profile } from '../../types/profile';

type TDashboardActions = {
	profile?: Profile;
};
export const DashboardActions: React.FC<TDashboardActions> = ({ profile }) => {
	return (
		<Fragment>
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
						<Link to="/edit-profile" className="btn btn-light">
							<i className="fas fa-user-circle text-primary" /> Edit Profile
						</Link>
						<Link to="/create-experience" className="btn btn-light">
							<i className="fab fa-black-tie text-primary" /> Add Experience
						</Link>
						<Link to="/create-education" className="btn btn-light">
							<i className="fas fa-graduation-cap text-primary" /> Add Education
						</Link>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};
