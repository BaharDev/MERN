import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { alertActions, ActionMessage } from '../../actions/alert';

type Alert = {
	message: string;
	alertType: string;
	id: any;
};
export type AlertProps = {
	alerts?: Alert[];
	removeAlerts(): ActionMessage;
};
const Alert: React.SFC<AlertProps> = (props) => {
	const { alerts, removeAlerts } = props;
	useEffect(
		() => {
			if (alerts && alerts?.length > 0){
				setTimeout(() => {
					removeAlerts();
				}, 3000);
			}
			
		},
		[ alerts ]
	);
	return (
		<div>
			{alerts &&
				alerts.length > 0 &&
				alerts.map((alert) => {
					return (
						<div key={alert.id} className={`alert alert-${alert.alertType}`}>
							{alert.message}
						</div>
					);
				})}
		</div>
	);
};

const mapStateToProps = (state: any) => ({
	alerts: state.alert
});

export default connect(mapStateToProps, { ...alertActions })(Alert);
