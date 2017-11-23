// @flow

import * as React from 'react';
import { withRouter } from 'react-router-dom';
import Node from '../node';
import Adventure from '../../adventure.json';
import { takeAction } from '../../utils/api';
import type { Character, ResultingAction, Save } from '../../types';
import resolveGameState from '../../resolveGameState';

type State = {
	character: ?Character,
	participants: ?Array<Character>,
	save: ?Save
};

class GamePage extends React.Component<*, State> {
	constructor(props) {
		super(props);
		this.state = {
			character: null,
			participants: null,
			save: {},
		};
		this.handleAction = this.handleAction.bind(this);
	}
	componentDidMount() {
		this.props.gameData
			.then(gameData => gameData.party)
			.then((party) => {
				this.setState({
					character: party.character,
					participants: party.participants,
					save: party.save,
				}, () => {
					this.props.gameData.then((gameData) => {
						gameData.onSaveChange((data, key) => {
							this.setState({
								save: {
									...this.state.save,
									[key]: data,
								},
							});
						});
					});
				});
			});
	}
	handleAction: ResultingAction => void;
	handleAction(action: ResultingAction) {
		const { character, participants, save } = this.state;
		if (!character || !participants) {
			return;
		}
		const gameState = resolveGameState({
			adventure: Adventure,
			participants,
			save,
			playerId: character._uid,
		});
		takeAction(
			character._partyRef,
			gameState.player._uid,
			gameState.currentNode.id,
			action.id,
		);
	}

	render() {
		const { character, participants, save } = this.state;
		if (!character || !participants || !save) {
			return 'Loading...';
		}
		const gameState = resolveGameState({
			adventure: Adventure,
			participants,
			save,
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
