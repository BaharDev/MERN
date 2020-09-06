import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { postActions } from '../../actions/posts';
import { alertActions, ActionMessage } from '../../actions/alert';

export type CreateComment = {
	postId: unknown;
	removeAlerts(): ActionMessage;
	createComment(text: string, postId: unknown): Promise<void>;
};

const CreateComment: React.FC<CreateComment> = ({ removeAlerts, createComment, postId }) => {
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
		await createComment(d, postId);
		e.target.reset();
	};
	return (
		<div className="post-form">
			<div className="bg-primary p">
				<h3>Leave A Comment</h3>
			</div>
			<form className="form my-1" onSubmit={handleSubmit(onHandleSubmit)}>
				<textarea name="text" cols={30} rows={5} placeholder="Comment on this post" ref={register} />
				{errors.text && <p className="error">{errors.text.message}</p>}
				<input type="submit" className="btn btn-dark my-1" value="Submit" />
			</form>
		</div>
	);
};

export default connect(null, { ...postActions, ...alertActions })(CreateComment);
