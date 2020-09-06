import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { authActions } from '../../actions/auth';

export type NavbarProps = {
	logoutUser(): Promise<void>;
	isAuthenticated: boolean;
};

const Navbar: React.SFC<NavbarProps> = (props) => {
	const { isAuthenticated, logoutUser } = props;
	const history = useHistory();
	const onLoggingUserOut = async () => {
		await logoutUser();
		//@ts-ignore
		history.push('/login');
	};
	return (
		<nav className="navbar bg-dark">
			<h1>
				<Link to="/landing" >DevConnector</Link>
			</h1>
			<ul>
				<li>	<Link to="/profiles">Developers</Link></li>
			
				
				{isAuthenticated ? (
					<>
					<li>
						<Link to="/posts" title="Posts">
						Posts
					</Link>
					</li>
					<li>
						<Link to="/dashboard" title="Dashboard">
						Dashboard
					</Link>
					</li>
					<li>
						<a href="#/" onClick={onLoggingUserOut} style={{ cursor: 'pointer' }}>
							Logout
						</a>
					</li>
					</>
				) : (
					<>
					<li>
					<Link to="/register" title="Register">
						Register
					</Link>
				</li>
					<li>
						<Link to="/login" title="Login">
							Login
						</Link>
					</li>
					</>
				)}
			</ul>
		</nav>
	);
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { ...authActions })(Navbar);
