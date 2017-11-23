import * as React from 'react';
import { withRouter } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

import { createCharacter } from '../../../utils/api';

class CharacterProfile extends React.Component {
	constructor(props) {
		super(props);

		this.createDummyCharacter = this.createDummyCharacter.bind(this);
	}

	createDummyCharacter() {
		const { gameData, history } = this.props;

		createCharacter(gameData.user.uid, {
			id: '',
			name: gameData.user.displayName,
			tags: [],
			skills: {
				COMBAT: 0,
				SOCIAL: 0,
				WITS: 0,
				SCIENCE: 0,
			},
		}).then(() => history.push('/character/profile/yours'));
	}

	render() {
		return (
			<div>
				<p>Give me tha details</p>,
				<FlatButton
					label="Fake Me a Character"
					onClick={this.createDummyCharacter}
				/>
			</div>
		);
	}
}

export default withRouter(CharacterProfile);
