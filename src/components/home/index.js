import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { isAuthenticated } from '../../firebase';
import resolveGameData from '../../utils/gameDataProxy';

class Home extends Component {
	static displayName = 'App';

	componentWillMount() {
		const { history } = this.props;

		if (!isAuthenticated()) {
			history.push('/login');
		}

		resolveGameData().then((gameData) => {
			gameData.character
				.then((character) => {
					console.log(character);
				})
				.catch(() => history.push('/character/create'));
		});
	}

	render() {
		return <p>Home</p>;
	}
}

export default withRouter(Home);
