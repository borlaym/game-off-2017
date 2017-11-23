// @flow

import * as React from 'react';
import { withRouter } from 'react-router-dom';
import Node from '../node';
import Adventure from '../../adventure.json';
import { resolveCharacter, resolveParty, takeAction } from '../../utils/api';
import { auth, isAuthenticated } from '../../firebase';
import type { Character, ResultingAction, Party, Save } from '../../types';
import resolveGameState from '../../resolveGameState';

type State = {
	character: ?Character,
	party: ?Party,
	save: ?Save
};

class GamePage extends React.Component<*, State> {
	constructor(props) {
		super(props);
		this.state = {
			character: null,
			party: null,
			save: null,
		};
		this.handleAction = this.handleAction.bind(this);
	}
	componentWillMount() {
		const { history } = this.props;
		if (!isAuthenticated()) {
			history.push('/login');
		}
		auth.onAuthStateChanged((user) => {
			if (user) {
				resolveCharacter(user.uid)
				.then((player) => {
					resolveParty(player)
						.then(party => {
							this.setState({
								character: player,
								party,
								save: party.save
							});
						});
				})
				.catch((err) => {
					console.log(err);
					history.push('/character/create')
				});
			}
		});
	}
	handleAction: ResultingAction => void;
	handleAction(action: ResultingAction) {
		if (!this.state.character || !this.state.party) {
			return;
		}
		const gameState = resolveGameState({
			adventure: Adventure,
			party: this.state.party,
			playerId: this.state.character._uid,
		});
		if (this.state.pary) {
			takeAction(this.state.party._uid, gameState.player._uid, gameState.currentNode.id, action.id);
		}
	}

	render() {
		if (!this.state.character || !this.state.party || !this.state.save) {
			return 'Loading...';
		}
		const gameState = resolveGameState({
			adventure: Adventure,
			party: this.state.party,
			playerId: this.state.character._uid,
		});
		return (
			<div className="game-page">
				{gameState.log.map(logEntry => <p key={logEntry.timestamp}>{logEntry.text}</p>)}
				<Node
					node={gameState.currentNode}
					character={gameState.player}
					globalTags={gameState.globalTags}
					onAction={this.handleAction}
				/>
			</div>
		);
	}
}

export default withRouter(GamePage);
