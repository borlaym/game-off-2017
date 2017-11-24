// @flow

import * as React from 'react';
import { TextField, Button } from 'material-ui-next';
import Grid from 'material-ui-next/Grid';
import Typography from 'material-ui-next/Typography';
import Select from 'material-ui-next/Select';
import { MenuItem } from 'material-ui-next/Menu';

import type { Tag } from '../../types';

type Props = Tag & {
	onSave: (Tag) => void
};

type TagField = 'Id' | 'Name' | 'Description' | 'GainsText' | 'LosesText' | 'Visibility';

const toSlug = (str: string) =>
	str
		.toLowerCase()
		.replace(/[^\w ]+/g, '')
		.replace(/ +/g, '-');

export default class TagBuilder extends React.Component<Props, Tag> {
	constructor(props: Props) {
		super(props);

		const {
			onSave,
			...tagsFromProp
		} = props;

		this.state = {
			...this.state,
			...tagsFromProp,
		};

		Object.keys(this.state).forEach((key: TagField) => {
			const capitalized: TagField = `${key[0].toUpperCase()}${key.substr(1)}`;
			this[`handle${capitalized}Change`] = this.handleChange.bind(this, key);
		});

		this.handleSave = this.handleSave.bind(this);
	}

	state = {
		id: '',
		name: '',
		description: '',
		gainsText: '',
		losesText: '',
		visibility: 'public',
	};

	handleSave: (SyntheticInputEvent<>) => void;
	handleIdChange: (SyntheticInputEvent<>) => void;
	handleNameChange: (SyntheticInputEvent<>) => void;
	handleDescriptionChange: (SyntheticInputEvent<>) => void;
	handleGainsTextChange: (SyntheticInputEvent<>) => void;
	handleLosesTextChange: (SyntheticInputEvent<>) => void;
	handleVisibilityChange: (SyntheticInputEvent<>) => void;

	handleChange(key: string, event: SyntheticInputEvent<>) {
		this.setState({
			[key]: event.target.value,
		});
	}

	handleSave() {
		const tagData = { ...this.state };
		if (this.state.name.length > 0) {
			if (tagData.id.length === 0) {
				tagData.id = toSlug(tagData.name);
			}
			this.props.onSave(tagData);
		}
	}

	render() {
		const { name } = this.state;

		return (
			<Grid container>
				<Grid item xs={12}>
					<Typography type="subheading">ID</Typography>
					<TextField value={this.state.id} onChange={this.handleIdChange} fullWidth />
				</Grid>
				<Grid item xs={12}>
					<Typography type="subheading">Name</Typography>
					<TextField value={this.state.name} onChange={this.handleNameChange} fullWidth />
				</Grid>
				<Grid item xs={12}>
					<Typography type="subheading">Description</Typography>
					<TextField
						value={this.state.description}
						onChange={this.handleDescriptionChange}
						fullWidth
						multiline
						rows={5}
					/>
				</Grid>
				<Grid item xs={12}>
					<Typography type="subheading">Gains Text</Typography>
					<TextField value={this.state.gainsText} onChange={this.handleGainsTextChange} fullWidth />
				</Grid>
				<Grid item xs={12}>
					<Typography type="subheading">Loses Text</Typography>
					<TextField value={this.state.losesText} onChange={this.handleLosesTextChange} fullWidth />
				</Grid>
				<Grid item xs={12}>
					<Typography type="subheading">Visibility</Typography>
					<Select value={this.state.visibility} onChange={this.handleVisibilityChange}>
						<MenuItem value="public">public</MenuItem>
						<MenuItem value="private">private</MenuItem>
						<MenuItem value="hidden">hidden</MenuItem>
					</Select>
				</Grid>
				<Grid item xs={12}>
					<Button onClick={this.handleSave} color="primary" raised disabled={!name.length}>Save</Button>
				</Grid>
			</Grid>
		);
	}
}
