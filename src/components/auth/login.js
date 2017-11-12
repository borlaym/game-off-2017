import * as React from 'react';
import FlatButton from 'material-ui/FlatButton';

import firebase from '../../firebase';

export default class LoginPage extends React.Component {
	static displayName = LoginPage;
	
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
			<div>
				<h1>Please log in!</h1>
				<FlatButton label="Login" onClick={this.authenticate} />
			</div>
		);
	}
}
