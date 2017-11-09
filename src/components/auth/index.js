import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import firebase from '../../firebase';

class Login extends React.Component {
	static muiName = 'FlatButton';

	constructor(props) {
		super(props);
		this.authenticate = this.authenticate.bind(this);
	}

	authenticate() {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase
			.auth()
			.signInWithPopup(provider)
			.catch(function(error) {
				console.error(error);
			});
	}

	render() {
		return (
			<FlatButton
				{...this.props}
				label="Login"
				onClick={this.authenticate}
			/>
		);
	}
}

class LoggedIn extends React.Component {
	static muiName = 'IconMenu';

	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout() {
		firebase
			.auth()
			.signOut()
			.then(() => {
				this.setState({
					user: null
				});
			});
	}

	render() {
		return (
			<IconMenu
				{...this.props}
				iconButtonElement={
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				}
				targetOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
			>
				<MenuItem primaryText="Character" />
				<MenuItem primaryText="Settings" />
				<MenuItem primaryText="Sign out" onClick={this.logout} />
			</IconMenu>
		);
	}
}

export default class Auth extends React.Component {
	state = {
		user: null
	};

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({ user });
			} else {
				this.setState({ user: null });
			}
		});
	}

	render() {
		const { user } = this.state;
		return <div>{user ? <LoggedIn /> : <Login />}</div>;
	}
}
