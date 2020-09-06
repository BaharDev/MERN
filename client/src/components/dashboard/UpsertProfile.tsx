import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { alertActions, ActionMessage } from '../../actions/alert';
import { profileActions } from '../../actions/profile';
import { Profile } from '../../types/profile';

export type UpsertProfileProps = {
	removeAlerts(): ActionMessage;
	upsertProfile(profile: Profile, isEdit: boolean, history: any): Promise<void>;
	profile: Profile;
};

const UpsertProfile: React.FC<UpsertProfileProps> = (props) => {
	const { removeAlerts, upsertProfile, profile } = props;
	const [ showSocialMedia, setShowSocialMedia ] = useState(false);
	const history = useHistory();

	const schema = yup.object().shape({
		status: yup
			.string()
			.oneOf(
				[
					'Developer',
					'Junior Developer',
					'Senior Developer',
					'Manager',
					'Student or Learning',
					'Instructor',
					'Intern',
					'Other',
				],
				'Please select a status',
			),
		skills: yup.string().required('Skills is required'),
	});
	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			status: profile ? profile.status : '',
			bio: profile ? profile.bio : '',
			company: profile ? profile.company : '',
			location: profile ? profile.location : '',
			skills: profile ? profile.skills : '',
			githubUserName: profile ? profile.githubUserName : '',
			facebook: profile ? profile.social?.facebook : '',
			twitter: profile ? profile.social?.twitter : '',
			linkedin: profile ? profile.social?.linkedin : '',
			youtube: profile ? profile.social?.youtube : '',
		},
		criteriaMode: 'all',
		reValidateMode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
		resolver: yupResolver(schema),
	});
	const onHandleSubmit: any = async (d: any) => {
		removeAlerts();
		const isEdit = profile ? true : false;
		await upsertProfile(d, isEdit, history);
	};
	return (
		<section className="container">
			<h1 className="large text-primary">Create Your Profile</h1>
			<p className="lead">
				<i className="fas fa-user" /> Let's get some information to make your profile stand out
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={handleSubmit(onHandleSubmit)}>
				<div className="form-group">
					<select name="status" ref={register}>
						<option value="0">* Select Professional Status</option>
						<option value="Developer">Developer</option>
						<option value="Junior Developer">Junior Developer</option>
						<option value="Senior Developer">Senior Developer</option>
						<option value="Manager">Manager</option>
						<option value="Student or Learning">Student or Learning</option>
						<option value="Instructor">Instructor or Teacher</option>
						<option value="Intern">Intern</option>
						<option value="Other">Other</option>
					</select>
					<small className="form-text">Give us an idea of where you are at in your career</small>
					{errors.status && <p className="error">{errors.status.message}</p>}
				</div>
				<div className="form-group">
					<input type="text" placeholder="Company" name="company" ref={register} />
					<small className="form-text">Could be your own company or one you work for</small>
				</div>
				<div className="form-group">
					<input type="text" placeholder="Location" name="location" ref={register} />
					<small className="form-text">City & state suggested (eg. Boston, MA)</small>
				</div>
				<div className="form-group">
					<input type="text" placeholder="* Skills" name="skills" ref={register} />
					<small className="form-text">Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
					{errors.skills && <p className="error">{errors.skills.message}</p>}
				</div>
				<div className="form-group">
					<input type="text" placeholder="Github Username" name="githubUserName" ref={register} />
					<small className="form-text">
						If you want your latest repos and a Github link, include your username
					</small>
				</div>
				<div className="form-group">
					<textarea placeholder="A short bio of yourself" name="bio" ref={register} />
					<small className="form-text">Tell us a little about yourself</small>
				</div>

				<div className="my-2">
					<button
						type="button"
						className="btn btn-light"
						onClick={() => setShowSocialMedia(!showSocialMedia)}
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>
				<div className={showSocialMedia ? `visible` : `hidden`}>
					<div className="form-group social-input">
						<i className="fab fa-twitter fa-2x" />
						<input type="text" placeholder="Twitter URL" name="twitter" ref={register} />
					</div>

					<div className="form-group social-input">
						<i className="fab fa-facebook fa-2x" />
						<input type="text" placeholder="Facebook URL" name="facebook" ref={register} />
					</div>

					<div className="form-group social-input">
						<i className="fab fa-youtube fa-2x" />
						<input type="text" placeholder="YouTube URL" name="youtube" ref={register} />
					</div>

					<div className="form-group social-input">
						<i className="fab fa-linkedin fa-2x" />
						<input type="text" placeholder="Linkedin URL" name="linkedin" ref={register} />
					</div>

					<div className="form-group social-input">
						<i className="fab fa-twitter fa-2x" />
						<input type="text" placeholder="Twitter URL" name="twitter" ref={register} />
					</div>
				</div>
				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn btn-light my-1" to="/dashboard">
					Go Back
				</Link>
			</form>
		</section>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile.profile,
});

export default connect(mapStateToProps, { ...alertActions, ...profileActions })(UpsertProfile);
