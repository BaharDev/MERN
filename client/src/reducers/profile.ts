import { ActionMessage } from '../actions/alert';
import { ActionType } from '../actions/actionType';
import { Profile } from '../types/profile';

export type ProfileState = {
	profile: Profile;
	profiles: Profile[];
	repos: string[];
	isLoading: boolean;
};
const initialState: ProfileState = {
	profile: {
		_id: null,
		userId: null,
		name: '',
		avatar: '',
		company: '',
		location: '',
		bio: '',
		status: '',
		skills: [],
		education: [],
		experience: [],
		githubUserName: '',
		social: {},
		user:{
			name: "",
			avatar: "",
			email: "",
			_id: null,
		}
	},
	profiles: [],
	repos: [],
	isLoading: true,
};
export const profileReducer = (state: ProfileState = initialState, action: ActionMessage) => {
	const { type, payLoad } = action;
	switch (type) {
		case ActionType.GET_PROFILE:
			return {
				...state,
				profile: payLoad,
				isLoading: false,
			};
		case ActionType.GET_PROFILES:
			return {
				...state,
				profiles: payLoad,
				isLoading: false,
			};
		case ActionType.GET_REPOS:
			return {
				...state,
				repos: payLoad,
				isLoading: false,
			};
		case ActionType.PROFILE_FAIL:
			return { profile: null, error: payLoad, isLoading: false };
		case ActionType.PROFILES_FAIL:
			return { profiles: [], error: payLoad, isLoading: false };
		case ActionType.REPOS_FAIL:
			return { repos: [], error: payLoad, isLoading: false };
		case ActionType.CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				isLoading: false,
			};
		case ActionType.DELETE_PROFILE:
			return { profile: null, error: null, isLoading: false };
		default:
			return state;
	}
};
