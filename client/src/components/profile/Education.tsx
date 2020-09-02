import React from 'react';
import { Profile } from '../../types/profile';
import Moment from 'react-moment';

type TEducation = {
	profile: Profile;
};

export const Education: React.FC<TEducation> = ({ profile }) => {
	return (
		<div className="profile-edu bg-white p-2">
			<h2 className="text-primary">Education</h2>
			{profile.education.map((education) => {
        return(
				<div>
					<h3>{education.school}</h3>
					<p>
						<Moment format="YYYY/MM/DD">{education.from}</Moment> -{' '}
						{education.current ? `Current` : <Moment format="YYYY/MM/DD">{education.to}</Moment>}
					</p>
					<p>
						<strong>Degree: </strong>
						{education.degree}
					</p>
					<p>
						<strong>Field Of Study: </strong>
						{education.fieldOfStudy}
					</p>
					<p>
						<strong>Description: </strong>
						{education.description ?? "-"}
					</p>
				</div>
        )
			})}
		</div>
	);
};
