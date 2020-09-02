import React from 'react';
import { Profile } from '../../types/profile';

type TGeneralInfo = {
  profile:Profile;
}
export const GeneralInfo : React.FC<TGeneralInfo> = ({profile}) => {
	return (
		<div className="profile-top bg-primary p-2">
			<img
				className="round-img my-1"
				src={`${profile.user.avatar}?s=200`}
				alt=""
			/>
			<h1 className="large">{profile.user.name}</h1>
			<p className="lead">{profile.status} at {profile.company}</p>
			<p>{profile.location}</p>
			<div className="icons my-1">
        {profile.social?.facebook && (
        <a href={profile.social?.facebook} target="_blank" rel="noopener noreferrer">
					<i className="fab fa-facebook fa-2x" />
				</a>
        )}
          {profile.social?.twitter && (
        <a href={profile.social?.twitter} target="_blank" rel="noopener noreferrer">
					<i className="fab fa-twitter fa-2x" />
				</a>
        )}
         {profile.social?.youtube && (
        <a href={profile.social?.youtube} target="_blank" rel="noopener noreferrer">
					<i className="fab fa-youtube fa-2x" />
				</a>
        )}
         {profile.social?.linkedin && (
        <a href={profile.social?.linkedin} target="_blank" rel="noopener noreferrer">
					<i className="fab fa-linkedin fa-2x" />
				</a>
        )}
			</div>
		</div>
	);
};
