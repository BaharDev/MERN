import React, { Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from '../../actions/auth';

export type TLanding = {
	isAuthenticated: boolean;
};

export const Landing: React.FC<TLanding> = ({ isAuthenticated }) => {
	const history = useHistory();
	useEffect(() => {
		if (isAuthenticated) {
			history.push('/dashboard');
		}
	}, [isAuthenticated, history]);
	return (
		<Fragment>
			<section className="landing">
				<div className="dark-overlay">
					<div className="landing-inner">
						<h1 className="x-large">Developer Connector</h1>
						<p className="lead">
							Create a developer profile/portfolio, share posts and get help from other developers
						</p>
						<div className="buttons">
							<Link className="btn btn-primary" to="/register">
								Register
							</Link>
							<Link className="btn btn-light" to="/login">
								Login
							</Link>
						</div>
					</div>
				</div>
			</section>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { ...authActions })(Landing);
