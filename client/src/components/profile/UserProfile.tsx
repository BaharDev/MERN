import React, { useEffect, useState, Fragment } from 'react';
import { Github } from './Github';
import { Education } from './Education';
import { Experience } from './Experience';
import { About } from './About';
import { GeneralInfo } from './GeneralInfo';
import { Profile } from '../../types/profile';
import { profileApi } from '../../api/profile';
import { Link } from 'react-router-dom';

type TUserProfile = {
	match: unknown;
};
export const UserProfile: React.FC<TUserProfile> = ({ match }) => {
	//@ts-ignore
	const [ profile, setProfile ] = useState<Profile>(null);
	useEffect(() => {
		//@ts-ignore
		const profileId = match.params.id;
		getProfile(profileId);
	}, [match]);

	const getProfile = async (profileId: unknown) => {
		const profileRes = await profileApi.getProfileById(profileId);
		if (profileRes.data) {
			//@ts-ignore
			setProfile(profileRes.data);
		}
	};
	return (
		<section className="container">
			<Link to="/profiles" className="btn btn-light">
				Back To Profiles
			</Link>

			<div className="profile-grid my-1">
				{profile && (
					<Fragment>
						<GeneralInfo profile={profile} />
						<About profile={profile} />
						<Experience profile={profile} />
						<Education profile={profile} />
						<Github userName={profile.user.email} />
					</Fragment>
				)}
			</div>
		</section>
	);
};
