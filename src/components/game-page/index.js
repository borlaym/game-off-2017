// @flow

import * as React from 'react';
import { withRouter } from 'react-router-dom';
import Node from '../node';
import Advanture from '../../adventure.json';
import { resolveCharacter } from '../../utils/api';
import { auth, isAuthenticated } from '../../firebase';
import type { Character } from '../../types';

type State = {
	character: ?Character
};

class GamePage extends React.Component<*, State> {
	state = {
		character: null
	};

	componentWillMount() {
		const { history } = this.props;

		if (!isAuthenticated()) {
			history.push('/login');
		}

		auth.onAuthStateChanged((user) => {
			if (user) {
				resolveCharacter(user.uid)
					.then((character) => {
						this.setState({
							character
						});
					})
					.catch(() => history.push('/character/create'));
			}
		});
	}

	render() {
		if (!this.state.character) {
			return 'Loading...';
		}
		return (
			<Node
				node={Advanture['starter']}
				character={this.state.character}
				globalTags={[]}
				onAction={action => console.log(action)}
			/>
		);
	}
}

export default withRouter(GamePage);
