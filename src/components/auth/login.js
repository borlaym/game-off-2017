import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';

import { auth, authProvider, isAuthenticated } from '../../firebase';

class LoginPage extends Component {
	static displayName = 'LoginPage';

	constructor(props) {
		super(props);

		this.authenticate = this.authenticate.bind(this);
	}

	componentWillMount() {
		const { history } = this.props;

		if (isAuthenticated()) {
			history.push('/');
		}
	}

	authenticate() {
		const { history } = this.props;
		const provider = new authProvider.GoogleAuthProvider();

		auth.signInWithPopup(provider)
			.then(() => history.push('/'))
			.catch(error => console.error(error));
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

export default withRouter(LoginPage);
