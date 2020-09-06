import { ActionMessage } from '../actions/alert';
import { ActionType } from '../actions/actionType';
import { Post } from '../types/post';
import { postsApi } from '../api/posts';

export type PostsState = {
	posts: Post[];
	post: Post;
	isLoading: boolean;
};
const initialState: PostsState = {
	posts: [],
	post: {
		text: '',
		likes: [],
		comments: [],
		_id: null,
		name: '',
		avatar: '',
		user: null,
		date: new Date()
	},
	isLoading: true
};
export const postReducer = (state: PostsState = initialState, action: ActionMessage) => {
	const { type, payLoad } = action;
	switch (type) {
		case ActionType.GET_POSTS:
			return {
				...state,
				posts: payLoad,
				isLoading: false
			};
		case ActionType.GET_POST:
			return {
				...state,
				post: payLoad,
				isLoading: false
			};
		case ActionType.ADD_POST:
			return {
				...state,
				isLoading: false
			};
		case ActionType.ADD_COMMENT:
			return {
				...state,
				post: { ...state.post, comments: payLoad },
				isLoading: false
			};
		case ActionType.LIKE_POST:
			return {
				...state,
				post: payLoad,
				isLoading: false
			};
		case ActionType.LIKE_POST:
			return {
				...state,
				post: payLoad,
				isLoading: false
			};
		case ActionType.POSTS_FAIL:
			return {
				...state,
				posts: [],
				error: payLoad,
				isLoading: false
			};
		case ActionType.POST_FAIL:
			return {
				...state,
				post: null,
				error: payLoad,
				isLoading: false
			};
		default:
			return state;
	}
};
