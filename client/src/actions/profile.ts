import { alertActions } from './alert';
import { ActionType } from './actionType';
import { profileApi } from '../api/profile';
import { Profile, Education, Experience } from '../types/profile';
import { authActions } from './auth';

export type ProfileAction = {
	getCurrentProfile(): (dispatch) => Promise<void>;
	getProfileById(id: unknown): (dispatch) => Promise<void>;
	getProfiles(): (dispatch) => Promise<void>;
	getRepos(userName: string): (dispatch) => Promise<void>;
	upsertProfile(profile: Profile, isEdit: boolean, history: any): (dispatch) => Promise<void>;
	createEducation(education: Education, history: any): (dispatch) => Promise<void>;
	createExperience(experience: Experience, history: any): (dispatch) => Promise<void>;
	deleteEducation(id: any, history: any): (dispatch) => Promise<void>;
	deleteExperience(id: any, history: any): (dispatch) => Promise<void>;
	deleteProfile(history: any): (dispatch) => Promise<void>;
	clearProfile(): (dispatch) => void;
};

export type ProfileActionMessage = {
	type: ActionType;
	payLoad: any;
};

export const profileActions: ProfileAction = {
	getCurrentProfile: () => {
		return async (dispatch) => {
			try {
				const res = await profileApi.getCurrentProfile();
				dispatch({
					type: ActionType.GET_PROFILE,
					payLoad: res.data
				});
			} catch (err) {
				dispatch({
					type: ActionType.PROFILE_FAIL,
					payLoad: {
						msg: err.response.statusText,
						status: err.response.status
					}
				});
			}
		};
	},
	getProfileById: (id: unknown) => {
		return async (dispatch) => {
			try {
				const res = await profileApi.getProfileById(id);
				dispatch({
					type: ActionType.GET_PROFILE,
					payLoad: res.data
				});
			} catch (err) {
				dispatch({
					type: ActionType.PROFILE_FAIL,
					payLoad: {
						msg: err.response.statusText,
						status: err.response.status
					}
				});
			}
		};
	},
	getProfiles: () => {
		return async (dispatch) => {
			try {
				const res = await profileApi.getProfiles();
				dispatch({
					type: ActionType.GET_PROFILES,
					payLoad: res.data
				});
			} catch (err) {
				dispatch({
					type: ActionType.PROFILES_FAIL,
					payLoad: {
						msg: err.response.statusText,
						status: err.response.status
					}
				});
			}
		};
	},
	getRepos: (userName: string) => {
		return async (dispatch) => {
			try {
				const res = await profileApi.getRepos(userName);
				dispatch({
					type: ActionType.GET_REPOS,
					payLoad: res.data
				});
			} catch (err) {
				dispatch({
					type: ActionType.REPOS_FAIL,
					payLoad: {
						msg: err.response.statusText,
						status: err.response.status
					}
				});
			}
		};
	},
	upsertProfile: (profile: Profile, isEdit: boolean, history: any) => {
		return async (dispatch) => {
			try {
				const res = await profileApi.upsertProfile(profile);
				dispatch({
					type: ActionType.GET_PROFILE,
					payLoad: res.data
				});

				dispatch(alertActions.setAlert(isEdit ? 'Profile Updated' : 'Profile Created', 'success'));

				if (!isEdit) {
					//@ts-ignore
					history.push('/dashboard');
				}
			} catch (err) {
				console.log(err);

				let errors: any[] = [];
				if (err && err.response.data.errors) {
					errors.push(err.response.data.errors);
				}
				if (errors.length > 0) {
					errors.forEach((e) => dispatch(alertActions.setAlert(e.msg, 'danger')));
				}
				dispatch({
					type: ActionType.PROFILE_FAIL,
					payLoad: {
						msg: err.response.statusText,
						status: err.response.status
					}
				});
			}
		};
	},
	createEducation: (education: Education, history: any) => {
		return async (dispatch) => {
			try {
				const res = await profileApi.createEducation(education);
				dispatch({
					type: ActionType.GET_PROFILE,
					payLoad: res.data
				});

				dispatch(alertActions.setAlert('Education Added!', 'success'));

				//@ts-ignore
				history.push('/dashboard');
			} catch (err) {
				console.log(err);

				let errors: any[] = [];
				if (err && err.response.data.errors) {
					errors.push(err.response.data.errors);
				}
				if (errors.length > 0) {
					errors.forEach((e) => dispatch(alertActions.setAlert(e.msg, 'danger')));
				}
				dispatch({
					type: ActionType.PROFILE_FAIL,
					payLoad: {
						msg: err.response.statusText,
						status: err.response.status
					}
				});
			}
		};
	},
	createExperience: (experience: Experience, history: any) => {
		return async (dispatch) => {
			try {
				const res = await profileApi.createExperience(experience);
				dispatch({
					type: ActionType.GET_PROFILE,
					payLoad: res.data
				});

				dispatch(alertActions.setAlert('Experience Added!', 'success'));

				//@ts-ignore
				history.push('/dashboard');
			} catch (err) {
				console.log(err);

				let errors: any[] = [];
				if (err && err.response.data.errors) {
					errors.push(err.response.data.errors);
				}
				if (errors.length > 0) {
					errors.forEach((e) => dispatch(alertActions.setAlert(e.msg, 'danger')));
				}
				dispatch({
					type: ActionType.PROFILE_FAIL,
					payLoad: {
						msg: err.response.statusText,
						status: err.response.status
					}
				});
			}
		};
	},
	deleteExperience: (id: number, history: any) => {
		return async (dispatch) => {
			try {
				const res = await profileApi.deleteExperience(id);
				dispatch({
					type: ActionType.GET_PROFILE,
					payLoad: res.data
				});

				dispatch(alertActions.setAlert('Experience Deleted!', 'success'));

				//@ts-ignore
				history.push('/dashboard');
			} catch (err) {
				console.log(err);

				let errors: any[] = [];
				if (err && err.response.data.errors) {
					errors.push(err.response.data.errors);
				}
				if (errors.length > 0) {
					errors.forEach((e) => dispatch(alertActions.setAlert(e.msg, 'danger')));
				}
				dispatch({
					type: ActionType.PROFILE_FAIL,
					payLoad: {
						msg: err.response.statusText,
						status: err.response.status
					}
				});
			}
		};
	},
	deleteEducation: (id: any, history: any) => {
		return async (dispatch) => {
			try {
				const res = await profileApi.deleteEducation(id);
				dispatch({
					type: ActionType.GET_PROFILE,
					payLoad: res.data
				});

				dispatch(alertActions.setAlert('Education Deleted!', 'success'));

				//@ts-ignore
				history.push('/dashboard');
			} catch (err) {
				console.log(err);

				let errors: any[] = [];
				if (err && err.response.data.errors) {
					errors.push(err.response.data.errors);
				}
				if (errors.length > 0) {
					errors.forEach((e) => dispatch(alertActions.setAlert(e.msg, 'danger')));
				}
				dispatch({
					type: ActionType.PROFILE_FAIL,
					payLoad: {
						msg: err.response.statusText,
						status: err.response.status
					}
				});
			}
		};
	},
	deleteProfile: (history: any) => {
		return async (dispatch) => {
			try {
				await profileApi.deleteProfile();
				dispatch({
					type: ActionType.DELETE_PROFILE,
					payLoad: null
				});
				dispatch(authActions.logoutUser());
				//@ts-ignore
				history.push('/login');
			} catch (err) {
				console.log(err);

				let errors: any[] = [];
				if (err && err.response.data.errors) {
					errors.push(err.response.data.errors);
				}
				if (errors.length > 0) {
					errors.forEach((e) => dispatch(alertActions.setAlert(e.msg, 'danger')));
				}
			}
		};
	},
	clearProfile: () => {
		return async (dispatch) => {
			dispatch({
				type: ActionType.CLEAR_PROFILE,
				payLoad: null
			});
		};
	}
};
