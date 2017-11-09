import * as React from 'react';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import ActionEject from 'material-ui/svg-icons/action/eject';
import { red500 } from 'material-ui/styles/colors';

import firebase from '../../firebase';

export default class Auth extends React.Component {
	state = {
		user: null
	};

	constructor(props) {
		super(props);
		this.authenticate = this.authenticate.bind(this);
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({ user });
			}
		});
	}

	authenticate() {
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(function(result) {
				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = result.credential.accessToken;
				// The signed-in user info.
				var user = result.user;
				console.log(user);
			})
			.catch(function(error) {
				console.error(error);
			});
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
		const { user } = this.state;
		return (
			<div>
				{user ? (
					<p>
						Hello {user.displayName}!
						<IconButton tooltip="Logout" onClick={this.logout}>
							<ActionEject color={red500} />
						</IconButton>
					</p>
				) : (
					<FlatButton
						label="Login"
						primary={true}
						onClick={this.authenticate}
					/>
				)}
			</div>
		);
	}
}
