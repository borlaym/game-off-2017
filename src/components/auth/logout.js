import * as React from 'react';
import { auth } from '../../firebase';

export function LogOut() {
	auth.signOut();
}

export default class LoggedIn extends React.Component {
	componentWillMount() {
		LogOut();
	}

	render() {
		return <p>Logging out...</p>;
	}
}
