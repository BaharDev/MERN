import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { profileActions } from '../../actions/profile';
import { Profile } from '../../types/profile';
import { Link } from 'react-router-dom';

type TProfiles = {
	getProfiles(): Promise<void>;
	profiles: Profile[];
};
const Profiles: React.FC<TProfiles> = ({ getProfiles, profiles }) => {
	useEffect(() => {
		getProfiles();
	}, [getProfiles]);
	return (
		<section className="container">
			<h1 className="large text-primary">Developers</h1>
			<p className="lead">
				<i className="fab fa-connectdevelop" /> Browse and connect with developers
			</p>
			<div className="profiles">
				{profiles.length && profiles.map((profile) => {
					return (
						<Fragment>
							<div className="profile bg-light">
								<img className="round-img" src={`${profile.user.avatar}?s=200`} alt="" />
								<div>
									<h2>{profile.user.name}</h2>
									<p>
										{profile.status} at {profile.company}
									</p>
									<p>{profile.location}</p>
									<Link to={`/user-profile/${profile.user._id}`} className="btn btn-primary">
										View Profile
									</Link>
								</div>

								<ul>
									{profile.skills.map((skill, i) => {
										return (
											<>
												<li className="text-primary" key={i}>
													<i className="fas fa-check" /> {skill}
												</li>
											</>)
									})}
								</ul>
							</div>
						</Fragment>
					);
				})}
			</div>
		</section>
	);
};

const mapStateToProps = (state) => ({
	profiles: state.profile.profiles,
});

export default connect(mapStateToProps, { ...profileActions })(Profiles);
