import React from 'react';
import { connect } from 'react-redux';

type Alert = {
	message: string;
	alertType: string;
	id: any;
};
export type AlertProps = {
	alerts?: Alert[];
};
const Alert: React.SFC<AlertProps> = (props) => {
	const { alerts } = props;
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
	alerts: state.alert,
});

export default connect(mapStateToProps, null)(Alert);
