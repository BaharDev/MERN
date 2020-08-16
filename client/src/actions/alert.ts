import { ActionType } from './actionType';
import * as uuid from 'uuid';
export type AlertAction = {
	setAlert(message: string, alertType: string): ActionMessage;
	removeAlerts(): ActionMessage;
};

export type ActionMessage = {
	type: ActionType;
	payLoad: any;
};

export const alertActions: AlertAction = {
	setAlert: (message, alertType): ActionMessage => {
		const id = uuid.v4;
		return {
			type: ActionType.SET_ALERT,
			payLoad: { message, alertType, id },
		};
	},
	removeAlerts: (): ActionMessage => {
		return {
			type: ActionType.REMOVE_ALERTS,
			payLoad: null,
		};
	},
};
