import React from 'react';
import { Profile } from '../../types/profile';

type TAbout = {
  profile:Profile;
}
export const About: React.FC<TAbout> = ({profile}) => {
	return (
		<div className="profile-about bg-light p-2">
			<h2 className="text-primary">{profile.user.name}'s Bio</h2>
			<p>
				{profile.bio}
			</p>
			<div className="line" />
			<h2 className="text-primary">Skill Set</h2>
			<div className="skills">
         {profile.skills.map((skill) => {
                    return(
                    <>
		                  <div className="p-1">
					<i className="fa fa-check" /> {skill}
				</div>
                    </>)
      })}
			
			</div>
		</div>
	);
};
