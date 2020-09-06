import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { postActions } from '../../actions/posts';
import { alertActions, ActionMessage } from '../../actions/alert';

export type CreatePost = {
	removeAlerts(): ActionMessage;
	createPost(text: string): Promise<void>;
};

const CreatePost: React.FC<CreatePost> = ({ removeAlerts, createPost }) => {
	const schema = yup.object().shape({
		text: yup.string().required('Text is required')
	});
	const { register, handleSubmit, errors } = useForm({
		defaultValues: {
			text: ''
		},
		criteriaMode: 'all',
		reValidateMode: 'onChange',
		shouldFocusError: true,
		shouldUnregister: true,
		resolver: yupResolver(schema)
	});
	const onHandleSubmit: any = async (d: any, e) => {
		removeAlerts();
		await createPost(d);
		e.target.reset();
	};
	return (
		<div className="post-form">
			<div className="bg-primary p">
				<h3>Say Something...</h3>
			</div>
			<form className="form my-1" onSubmit={handleSubmit(onHandleSubmit)}>
				<div>
					<textarea name="text" cols={30} rows={5} placeholder="Create a post" ref={register} />
					{errors.text && <p className="error">{errors.text.message}</p>}
				</div>
				<input type="submit" className="btn btn-dark my-1" value="Submit" />
			</form>
		</div>
	);
};

export default connect(null, { ...postActions, ...alertActions })(CreatePost);
