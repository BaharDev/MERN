import { alertActions } from './alert';
import { userApi } from '../api/auth';
import { ActionType } from './actionType';
import { setAuthToken } from '../api/config';
import { profileApi } from '../api/profile';
import CreateProfile from './../components/dashboard/CreateProfile';
import { Profile } from '../types/profile';

export type AuthAction = {
	getCurrentProfile(): (dispatch) => Promise<void>;
	createProfile(profile: Profile): (dispatch) => Promise<void>;
};

export type AuthActionMessage = {
	type: ActionType;
	payLoad: any;
};

export const profileActions: AuthAction = {
	getCurrentProfile: () => {
		return async (dispatch) => {
			try {
				const res = await profileApi.getCurrentProfile();
				dispatch({
					type: ActionType.GET_CURRENT_PROFILE,
					payLoad: res.data,
				});
			} catch (err) {
				dispatch({
					type: ActionType.PROFILE_FAIL,
					payLoad: {
						msg: err.response.statusText,
						status: err.response.status,
					},
				});
			}
		};
	},
	createProfile: (profile: Profile) => {
		return async (dispatch) => {
			try {
				const res = await profileApi.createProfile(profile);
				dispatch({
					type: ActionType.GET_CURRENT_PROFILE,
					payLoad: res,
				});
			} catch (err) {
				dispatch({
					type: ActionType.PROFILE_FAIL,
					payLoad: {
						msg: err.response.statusText,
						status: err.response.status,
					},
				});
			}
		};
	},
};
