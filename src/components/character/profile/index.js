import * as React from 'react';

export default class CharacterProfile extends React.Component {

	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.setState({ user });
				console.log(user);
			}
		});
	}

}