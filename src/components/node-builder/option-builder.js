import * as React from 'react';
import { TextField, Button } from 'material-ui-next';
import Grid from 'material-ui-next/Grid';
import Typography from 'material-ui-next/Typography';
import Select from 'material-ui-next/Select';
import Switch from 'material-ui-next/Switch';
import Chip from 'material-ui/Chip';
import { MenuItem } from 'material-ui-next/Menu';

export default class OptionBuilder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.id || '',
			conditions: props.conditions || [],
			globalConditions: props.globalConditions || [],
			text: props.text || '',
			logText: props.logText || '',
			skillCheck: props.skillCheck || {},
			text: props.text || '',
			resultingAction: props.resultingAction || {
				id: '',
				targetNode: '',
				effects: {
					gainTags: [],
					loseTags: []
				}
			},
			failedResultingAction: props.failedResultingAction || {
				id: '',
				targetNode: '',
				effects: {
					gainTags: [],
					loseTags: []
				}
			},
		};
		Object.keys(this.state).forEach((key) => {
			const capitalized = `${key[0].toUpperCase()}${key.substr(1)}`;
			this[`handle${capitalized}Change`] = this.handleChange.bind(this, key);
		});
	}

	handleChange(key, event) {
		this.setState({
			[key]: event.target.value
		});
	}

	render() {
		return (
			<Grid container>
				<Grid item xs={12}>
					<Typography type="subheading">ID</Typography>
					<TextField value={this.state.id} onChange={this.handleIdChange} />
				</Grid>
				<Grid item xs={12}>
					<Typography type="subheading">Character Conditions</Typography>
					{this.state.conditions.map((condition) => {
						<Chip
							label={condition.name}
							onRequestDelete={this.handleRequestDelete}
						/>
					})}
					<TextField value={this.state.conditions} onChange={this.handleConditionsChange} />
				</Grid>
				<Grid item xs={12}>
					<Typography type="subheading">Text</Typography>
					<TextField value={this.state.text} onChange={this.handleTextChange} />
				</Grid>
				<Grid item xs={12}>
					<Typography type="subheading">In-game timestamp</Typography>
					<TextField
						id="datetime-local"
						type="datetime-local"
						InputLabelProps={{
							shrink: true,
						}}
						value={this.state.inGameTimestamp}
						onChange={this.handleInGameTimestampChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography type="subheading">Is blocker?</Typography>
					<Switch
						checked={this.state.blocker}
						onChange={this.handleBlockerChange}
						aria-label="blocker"
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography type="subheading">Visibility</Typography>
					<Select value={this.state.visibility} onChange={this.handleVisibilityChange}>
						<MenuItem value="PUBLIC">PUBLIC</MenuItem>
						<MenuItem value="PRIVATE">PRIVATE</MenuItem>
						<MenuItem value="HIDDEN">HIDDEN</MenuItem>
					</Select>
				</Grid>
				<Grid item xs={12}>
					<Typography type="subheading">Notes</Typography>
					<TextField value={this.state.notes} onChange={this.handleNotesChange} multiline />
				</Grid>
				<Grid item xs={12}>
					<Button onClick={this.handleSave} color="primary" raised>Save</Button>
				</Grid>
			</Grid>
		);
	}
}
