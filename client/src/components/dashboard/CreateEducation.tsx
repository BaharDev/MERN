import React from 'react';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { alertActions, ActionMessage } from '../../actions/alert';
import { profileActions } from '../../actions/profile';
import { Education } from '../../types/profile';

export type TCreateEducation = {
	removeAlerts(): ActionMessage;
	createEducation(education: Education, history: any): Promise<void>;
};

const CreateEducation: React.FC<TCreateEducation> = (props) => {
	const { removeAlerts, createEducation } = props;
	const history = useHistory();

	const schema = yup.object().shape({
		school: yup.string().required('School is required'),
		degree: yup.string().required('Degree is required'),
		fieldOfStudy: yup.string().required('Field of study is required'),
	});
	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			school: '',
			degree: '',
			fieldOfStudy: '',
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
		await createEducation(d, history);
	};
	return (
		<section className="container">
			<h1 className="large text-primary">Add Your Education</h1>
			<p className="lead">
				<i className="fas fa-graduation-cap" /> Add any school, bootcamp, etc that you have attended
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={handleSubmit(onHandleSubmit)}>
				<div className="form-group">
					<input type="text" placeholder="* School or Bootcamp" name="school" ref={register} />
					{errors.school && <p className="error">{errors.school.message}</p>}
				</div>
				<div className="form-group">
					<input type="text" placeholder="* Degree or Certificate" name="degree" ref={register} />
					{errors.degree && <p className="error">{errors.degree.message}</p>}
				</div>
				<div className="form-group">
					<input type="text" placeholder="* Field Of Study" name="fieldOfStudy" ref={register} />
					{errors.fieldOfStudy && <p className="error">{errors.fieldOfStudy.message}</p>}
				</div>
				<div className="form-group">
					<h4>From Date</h4>
					<input type="date" name="from" ref={register} />
				</div>
				<div className="form-group">
					<p>
						<input type="checkbox" name="current" value="" ref={register} /> Current School or Bootcamp
					</p>
				</div>
				<div className="form-group">
					<h4>To Date</h4>
					<input type="date" name="to" ref={register} />
				</div>
				<div className="form-group">
					<textarea name="description" cols={30} rows={5} placeholder="Program Description" ref={register} />
				</div>
				<input type="submit" className="btn btn-primary my-1" />
				<Link className="btn btn-light my-1" to="/dashboard">
					Go Back
				</Link>
			</form>
		</section>
	);
};

export default connect(null, { ...alertActions, ...profileActions })(CreateEducation);
