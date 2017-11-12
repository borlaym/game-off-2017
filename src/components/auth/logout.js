import * as React from 'react';
import firebase from '../../firebase';

export function LogOut() {
	firebase.auth().signOut();
}

export default class LoggedIn extends React.Component {
	componentWillMount() {
		LogOut();
	}

	render() {
		return <p>Logging out...</p>;
	}
}
