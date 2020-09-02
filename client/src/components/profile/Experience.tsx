import React from 'react';
import { Profile } from '../../types/profile';
import Moment from 'react-moment';

type TAbout = {
	profile: Profile;
};
export const Experience: React.FC<TAbout> = ({ profile }) => {
	return (
		<div className="profile-exp bg-white p-2">
			<h2 className="text-primary">Experience</h2>
			{profile.experience.map((experience) => {
				return (
					<div>
						<h3 className="text-dark">{experience.company}</h3>
						<p>
							<Moment format="YYYY/MM/DD">{experience.from}</Moment> -{' '}
							{experience.current ? `Current` : <Moment format="YYYY/MM/DD">{experience.to}</Moment>}
						</p>
						<p>
							<strong>Position: </strong>
							{experience.title}
						</p>
						<p>
							<strong>Description: </strong>
							{experience.description ?? "-"}
						</p>
					</div>
				);
			})}
		</div>
	);
};
