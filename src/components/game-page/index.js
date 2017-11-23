// @flow

import * as React from 'react';
import { withRouter } from 'react-router-dom';
import Node from '../node';
import Adventure from '../../adventure.json';
import { resolveCharacter, resolveParty, takeAction } from '../../utils/api';
import { auth, isAuthenticated } from '../../firebase';
import type { Character, ResultingAction } from '../../types';
import resolveGameState from '../../resolveGameState';

type State = {
	character: ?Character
};

class GamePage extends React.Component<*, State> {
	state = {
		character: null
	};

	constructor(props) {
		super(props);
		this.handleAction = this.handleAction.bind(this);

	}
	
	componentDidMount() {
		this.props.gameData
			.then((gameData) => gameData.party)
			.then((party) => {
				console.log(party);
			});
			// resolveCharacter(user.uid)
			// .then((player) => {
			// 	resolveParty(player)
			// 		.then(party => {
			// 			console.log(resolveGameState({
			// 				adventure: Adventure,
			// 				party,
			// 				player
			// 			}))
			// 			this.setState({
			// 				character: player
			// 			});
			// 		});
			// })
			// .catch((err) => {
			// 	console.log(err);
			// 	history.push('/character/create')
			// });
	}

	handleAction(action: ResultingAction) {
		takeAction(this.state.character._partyRef, this.state.character._uid, 'starter', action.id);
	}

	render() {
		if (!this.state.character) {
			return 'Loading...';
		}
		console.log(this.state.character);
		return (
			<Node
				node={Adventure['starter']}
				character={this.state.character}
				globalTags={[]}
				onAction={this.handleAction}
			/>
		);
	}
}

export default withRouter(GamePage);
