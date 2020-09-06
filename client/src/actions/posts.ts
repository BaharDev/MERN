import { alertActions } from './alert';
import { userApi } from './../api/auth';
import { ActionType } from './actionType';
import { setAuthToken } from '../api/config';
import { tokenManager } from '../helpers/tokenManager';
import { profileActions } from './profile';
import { postsApi } from '../api/posts';

export type PostAction = {
    getPosts(): (dispatch) => Promise<void>;
    getPost(id: unknown): (dispatch) => Promise<void>;
	createPost(text: string): (dispatch) => Promise<void>;
	deletePost(id: unknown): (dispatch) => Promise<void>;
	deleteComment(id: unknown, commentId: unknown): (dispatch) => Promise<void>;
    createComment(text: string, postId: unknown): (dispatch) => Promise<void>;
	likeOrUnlikePost(id: unknown): (dispatch) => Promise<void>;
};

export type AuthActionMessage = {
	type: ActionType;
	payLoad: any;
};

export const postActions: PostAction = {
	getPosts: () => {
		return async (dispatch) => {
			try {
				const res = await postsApi.getPosts();
				dispatch({
					type: ActionType.GET_POSTS,
					payLoad: res.data,
				});
			} catch (err) {
				let errors: any[] = [];
				if (err.response.data.errors) {
					errors.push(err.response.data.errors);
				}
				if (errors.length > 0) {
					errors.forEach((e) => dispatch(alertActions.setAlert(e.msg, 'danger')));
				}
				dispatch({
					type: ActionType.POSTS_FAIL,
					payLoad: null,
				});
			}
		};
	},
	getPost: (id: unknown) => {
		return async (dispatch) => {
			try {
				const res = await postsApi.getPost(id);
				dispatch({
					type: ActionType.GET_POST,
					payLoad: res.data,
				});
			} catch (err) {
				let errors: any[] = [];
				if (err.response.data.errors) {
					errors.push(err.response.data.errors);
				}
				if (errors.length > 0) {
					errors.forEach((e) => dispatch(alertActions.setAlert(e.msg, 'danger')));
				}
				dispatch({
					type: ActionType.POST_FAIL,
					payLoad: null,
				});
			}
		};
	},
	createPost: (text: string) => {
		return async (dispatch) => {
			try {
				const res = await postsApi.createPost(text);
				dispatch({
					type: ActionType.ADD_POST,
					payLoad: res.data,
                });
                dispatch(postActions.getPosts());
			} catch (err) {
				let errors: any[] = [];
				if (err.response.data.errors) {
					errors.push(err.response.data.errors);
				}
				if (errors.length > 0) {
					errors.forEach((e) => dispatch(alertActions.setAlert(e.msg, 'danger')));
				}
				dispatch({
					type: ActionType.POST_FAIL,
					payLoad: null,
				});
			}
		};
    },
    createComment: (text: string, postId: unknown) => {
		return async (dispatch) => {
			try {
				const res = await postsApi.createComment(text, postId);
				dispatch({
					type: ActionType.ADD_COMMENT,
					payLoad: res.data,
                });
                dispatch(postActions.getPosts());
                dispatch(postActions.getPost(postId));
			} catch (err) {
				let errors: any[] = [];
				if (err.response.data.errors) {
					errors.push(err.response.data.errors);
				}
				if (errors.length > 0) {
					errors.forEach((e) => dispatch(alertActions.setAlert(e.msg, 'danger')));
				}
			}
		};
    },
    likeOrUnlikePost: (postId: unknown) => {
		return async (dispatch) => {
			try {
				const res = await postsApi.reactToPost(postId);
				dispatch({
					type: ActionType.LIKE_POST,
					payLoad: res.data,
                });
                dispatch(postActions.getPosts());
			} catch (err) {
				let errors: any[] = [];
				if (err.response.data.errors) {
					errors.push(err.response.data.errors);
				}
				if (errors.length > 0) {
					errors.forEach((e) => dispatch(alertActions.setAlert(e.msg, 'danger')));
				}
			}
		};
    },
    deletePost: (postId: unknown) => {
		return async (dispatch) => {
			try {
				await postsApi.deletePost(postId);
                dispatch(postActions.getPosts());
			} catch (err) {
				let errors: any[] = [];
				if (err.response.data.errors) {
					errors.push(err.response.data.errors);
				}
				if (errors.length > 0) {
					errors.forEach((e) => dispatch(alertActions.setAlert(e.msg, 'danger')));
				}
			}
		};
	},
	deleteComment: (postId: unknown, commentId: unknown) => {
		return async (dispatch) => {
			try {
				await postsApi.deleteComment(postId, commentId);
                dispatch(postActions.getPost(postId));
			} catch (err) {
				let errors: any[] = [];
				if (err.response.data.errors) {
					errors.push(err.response.data.errors);
				}
				if (errors.length > 0) {
					errors.forEach((e) => dispatch(alertActions.setAlert(e.msg, 'danger')));
				}
			}
		};
	},
};
