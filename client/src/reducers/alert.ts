import { ActionMessage } from './../actions/alert';
import { ActionType } from '../actions/actionType';

const initialState : any = [];
export const alertReducer = (state : any = initialState, action : ActionMessage) => {
	const { type, payLoad } = action;
	switch (type) {
		case ActionType.SET_ALERT:
			return [ ...state, payLoad ];
		case ActionType.REMOVE_ALERTS:
			return initialState;
		default:
			return state;
	}
};
