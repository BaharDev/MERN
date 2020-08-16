import { alertActions } from './alert';
import { userApi } from './../api/auth';
import { ActionType } from './actionType';
import { setAuthToken } from '../api/config';
import { getToken } from './../helprs/getToken';

export type AuthAction = {
	loadUser(): (dispatch) => Promise<void>;
	registerUser(email: string, name: string, password: string): (dispatch) => Promise<void>;
	loginUser(email: string, password: string): (dispatch) => Promise<void>;
	logoutUser(): (dispatch) => Promise<void>;
};

export type AuthActionMessage = {
	type: ActionType;
	payLoad: any;
};

export const authActions: AuthAction = {
	loadUser: () => {
		return async (dispatch) => {
			try {
				const token = getToken();
				setAuthToken(token);
				const res = await userApi.getUser();
				dispatch({
					type: ActionType.LOAD_USER,
					payLoad: res.data,
				});
			} catch (err) {
				console.log(err);

				let errors: any[] = [];
				if (err.response.data.errors) {
					errors.push(err.response.data.errors);
				}
				if (errors.length > 0) {
					errors.forEach((e) => dispatch(alertActions.setAlert(e.msg, 'danger')));
				}
				dispatch({
					type: ActionType.AUTH_FAILED,
					payLoad: null,
				});
			}
		};
	},
	registerUser: (email, name, password) => {
		return async (dispatch) => {
			try {
				const res = await userApi.register(email, name, password);
				dispatch({
					type: ActionType.REGISTER_SUCCESS,
					payLoad: { ...res.data, user: { name, email } },
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
					type: ActionType.REGISTER_FAIL,
					payLoad: null,
				});
			}
		};
	},
	loginUser: (email, password) => {
		return async (dispatch) => {
			try {
				const res = await userApi.login(email, password);
				console.log(res);
				dispatch({
					type: ActionType.LOGIN_SUCCESS,
					payLoad: res.data,
				});
				dispatch(authActions.loadUser());
			} catch (err) {
				let errors: any[] = [];
				if (err.response.data.errors) {
					errors.push(err.response.data.errors);
				}
				if (errors.length > 0) {
					errors.forEach((e) => dispatch(alertActions.setAlert(e.msg, 'danger')));
				}
				dispatch({
					type: ActionType.LOGIN_FAIL,
					payLoad: null,
				});
			}
		};
	},
	logoutUser: () => {
		return async (dispatch) => {
			dispatch({
				type: ActionType.LOGOUT_SUCCESS,
				payLoad: null,
			});
			dispatch({
				type: ActionType.CLEAR_PROFILE,
				payLoad: null,
			});
		};
	},
};
