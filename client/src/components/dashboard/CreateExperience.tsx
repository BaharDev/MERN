import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { alertActions, ActionMessage } from '../../actions/alert';
import { profileActions } from '../../actions/profile';
import { Education, Experience } from '../../types/profile';

export type TCreateExperience = {
	removeAlerts(): ActionMessage;
	createExperience(experience: Experience, history: any): Promise<void>;
};

const CreateExperience: React.FC<TCreateExperience> = (props) => {
	const { removeAlerts, createExperience } = props;
	const history = useHistory();

	const schema = yup.object().shape({
		title: yup.string().required('Job title is required'),
		company: yup.string().required('Company is required'),
		location: yup.string().required('Location is required'),
	});
	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			title: '',
			company: '',
			location: '',
			from: '',
			to: '',
			current: '',
			desciption: '',
		},
		criteriaMode: 'all',
		reValidateMode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
		resolver: yupResolver(schema),
	});
	const onHandleSubmit: any = async (d: any) => {
		removeAlerts();
		await createExperience(d, history);
	};
	return (
		<section className="container">
			<h1 className="large text-primary">Add An Experience</h1>
			<p className="lead">
				<i className="fas fa-code-branch" /> Add any developer/programming positions that you have had in the
				past
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={handleSubmit(onHandleSubmit)}>
				<div className="form-group">
					<input type="text" placeholder="* Job Title" name="title" ref={register} />
					{errors.title && <p className="error">{errors.title}</p>}
				</div>
				<div className="form-group">
					<input type="text" placeholder="* Company" name="company" ref={register} />
					{errors.company && <p className="error">{errors.company}</p>}
				</div>
				<div className="form-group">
					<input type="text" placeholder="* Location" name="location" ref={register} />
					{errors.location && <p className="error">{errors.location}</p>}
				</div>
				<div className="form-group">
					<h4>From Date</h4>
					<input type="date" name="from" ref={register} />
				</div>
				<div className="form-group">
					<p>
						<input type="checkbox" name="current" value="" ref={register} /> Current Job
					</p>
				</div>
				<div className="form-group">
					<h4>To Date</h4>
					<input type="date" name="to" ref={register} />
				</div>
				<div className="form-group">
					<textarea name="description" cols={30} rows={5} placeholder="Job Description" ref={register} />
				</div>
				<input type="submit" className="btn btn-primary my-1" />
				<a className="btn btn-light my-1" href="dashboard.html">
					Go Back
				</a>
			</form>
		</section>
	);
};

export default connect(null, { ...alertActions, ...profileActions })(CreateExperience);
