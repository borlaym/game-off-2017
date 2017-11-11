import * as React from 'react';
import { TextField, Button } from 'material-ui';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

export default class TagBuilder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: props.name || '',
			description: props.text || '',
			gainsText: props.gainsText || '',
			losesText: props.losesText || '',
			visibility: props.visibility || 'PUBLIC',
			notes: props.notes || ''
		};
		Object.keys(this.state).forEach((key) => {
			const capitalized = `${key[0].toUpperCase()}${key.substr(1)}`;
			this[`handle${capitalized}Change`] = this.handleChange.bind(this, key);
		});
		this.handleSave = this.handleSave.bind(this);
	}

	handleChange(key, event) {
		this.setState({
			[key]: event.target.value
		});
	}

	handleSave() {
		if (this.state.name.length > 0) {
			this.props.onChange(this.state);
		}
	}

	render() {
		return (
			<Grid container>
				<Grid item xs={12}>
					<Typography type="subheading">Name</Typography>
					<TextField value={this.state.name} onChange={this.handleNameChange} />
				</Grid>
				<Grid item xs={12}>
					<Typography type="subheading">Description</Typography>
					<TextField value={this.state.description} onChange={this.handleDescriptionChange} />
				</Grid>
				<Grid item xs={12}>
					<Typography type="subheading">Gains Text</Typography>
					<TextField value={this.state.gainsText} onChange={this.handleGainsTextChange} />
				</Grid>
				<Grid item xs={12}>
					<Typography type="subheading">Loses Text</Typography>
					<TextField value={this.state.losesText} onChange={this.handleLosesTextChange} />
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
