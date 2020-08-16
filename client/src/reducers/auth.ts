import { ActionMessage } from '../actions/alert';
import { ActionType } from '../actions/actionType';
import { getToken } from '../helprs/getToken';

export type Auth = {
	token?: any;
	user: any;
	isAuthenticated: boolean;
	isLoading: boolean;
};
const initialState: Auth = {
	token: getToken(),
	user: null,
	isAuthenticated: false,
	isLoading: true,
};
export const authReducer = (state: Auth = initialState, action: ActionMessage) => {
	const { type, payLoad } = action;
	switch (type) {
		case ActionType.LOGIN_SUCCESS:
		case ActionType.REGISTER_SUCCESS:
			const item = {
				value: payLoad.token,
				expiry: new Date().getTime() + 360000,
			};
			localStorage.setItem('token', JSON.stringify(item));
			return {
				...state,
				...payLoad,
				isAuthenticated: true,
				isLoading: false,
			};
		case ActionType.LOAD_USER:
			return {
				...state,
				user: action.payLoad,
				isAuthenticated: true,
				isLoading: false,
			};
		case ActionType.LOGOUT_SUCCESS:
			localStorage.removeItem('token');
			return { token: null, user: null, isAuthenticated: false, isLoading: false };
		case ActionType.LOGIN_FAIL:
		case ActionType.REGISTER_FAIL:
		case ActionType.AUTH_FAILED:
			return { token: null, user: null, isAuthenticated: false, isLoading: false };
		default:
			return state;
	}
};
