import { ActionMessage } from '../actions/alert';
import { ActionType } from '../actions/actionType';
import { Profile } from '../types/profile';
import { string } from 'yup';

export type ProfileState = {
	profile: Profile;
	profiles: Profile[];
	isLoading: boolean;
};
const initialState: ProfileState = {
	profile: {
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
	},
	profiles: [],
	isLoading: true,
};
export const profileReducer = (state: ProfileState = initialState, action: ActionMessage) => {
	const { type, payLoad } = action;
	switch (type) {
		case ActionType.GET_CURRENT_PROFILE:
			return {
				...state,
				profile: payLoad,
				isLoading: false,
			};
		case ActionType.PROFILE_FAIL:
			return { profile: null, error: payLoad, isLoading: false };
		case ActionType.CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				isLoading: false,
			};
		default:
			return state;
	}
};
