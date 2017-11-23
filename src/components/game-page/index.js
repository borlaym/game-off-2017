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
	componentDidMount() {
		this.props.gameData
			.then(gameData => gameData.party)
			.then((party) => {
				this.setState({
					character: party.character,
					party,
				}, () => {
					this.props.gameData.then((gameData) => {
						gameData.onSaveChange((data, key) => {
							this.setState({
								party: {
									...this.state.party,
									save: {
										...this.state.party.save,
										[key]: data,
									},
								},
							});
						});
					});
				});
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
		if (this.state.party) {
			takeAction(this.state.character._partyRef, gameState.player._uid, gameState.currentNode.id, action.id);
		}
	}

	render() {
		const { character, party } = this.state;
		if (!character || !party) {
			return 'Loading...';
		}
		const gameState = resolveGameState({
			adventure: Adventure,
			party,
			playerId: character._uid,
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
