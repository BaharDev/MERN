import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { profileActions } from './../../actions/profile';
import { Auth } from '../../reducers/auth';
import { ProfileState } from '../../reducers/profile';
import { Spinner } from './../Spinner';
import { ViewEducation } from './ViewEducation';
import { ViewExperience } from './ViewExperience';
import { DashboardActions } from './DashboardActions';
import ConfirmationModal, { DELETEType } from '../ConfirmationModal';
import { authActions } from '../../actions/auth';

type DashboardProps = {
	profile: ProfileState;
	auth: Auth;
	getCurrentProfile(): Promise<void>;
	loadUser(): Promise<void>;
};
const Dashboard: React.FC<DashboardProps> = (props) => {
	const { profile: { profile, isLoading }, auth: { user }, getCurrentProfile, loadUser } = props;
	const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);

	useEffect(() => {
		loadUser();
		getCurrentProfile();
	}, [getCurrentProfile]);
	const deleteAction = () => {
		setIsModalOpen(true);
	};
	return (
		<Fragment>
			{isLoading ? (
				<Spinner />
			) : (
				<section className="container">
					<h1 className="large text-primary">Dashboard</h1>
					<p className="lead">
						<i className="fas fa-user" /> Welcome {user && user.name}
					</p>
					<DashboardActions profile={profile} />
					{profile && profile.experience.length > 0 && <ViewExperience experience={profile.experience} />}
					{profile && profile.education.length > 0 && <ViewEducation education={profile.education} />}
					{profile && (
						<div className="my-2">
							<button className="btn btn-danger" onClick={deleteAction}>
								<i className="fas fa-user-minus" />
								Delete My Account
							</button>
						</div>
					)}
				</section>
			)}
			<ConfirmationModal type={DELETEType.PROFILE} modalIsOpen={isModalOpen} />
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { ...profileActions,...authActions })(Dashboard);
