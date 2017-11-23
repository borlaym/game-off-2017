import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { auth, isAuthenticated } from '../../firebase';
import withGameData from '../../utils/gameDataProxy';

class Home extends Component {
	static displayName = 'App';

	componentWillMount() {
		const { history } = this.props;

		if (!isAuthenticated()) {
			history.push('/login');
		}

		auth.onAuthStateChanged((user) => {
			if (user) {
				const gameData = withGameData(user);

				gameData.character
					.then((character) => {
						console.log(character);
					})
					.catch(() => history.push('/character/create'));
			}
		});
	}

	render() {
		return <p>Home</p>;
	}
}

export default withRouter(Home);
