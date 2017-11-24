/* eslint-disable */

import * as React from 'react';
import TextField from 'material-ui-next/TextField';
import Paper from 'material-ui-next/Paper';
import { MenuItem } from 'material-ui-next/Menu';
import Autosuggest from 'react-autosuggest';
import Chip from 'material-ui-next/Chip';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import uniq from 'lodash/uniq';

function renderInput(inputProps) {
	const {
		classes, autoFocus, value, ref, ...other
	} = inputProps;

	return (
		<TextField
			autoFocus={autoFocus}
			value={value}
			inputRef={ref}
			InputProps={{
				...other,
			}}
		/>
	);
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
	const matches = match(suggestion.id, query);
	const parts = parse(suggestion.id, matches);

	return (
		<MenuItem selected={isHighlighted} component="div">
			<div>
				{parts.map((part, index) => (part.highlight ? (
					<span key={index} style={{ fontWeight: 300 }}>
						{part.text}
					</span>
				) : (
					<strong key={index} style={{ fontWeight: 500 }}>
						{part.text}
					</strong>
				)))}
			</div>
		</MenuItem>
	);
}

function renderSuggestionsContainer(options) {
	const { containerProps, children } = options;

	return (
		<Paper {...containerProps} square>
			{children}
		</Paper>
	);
}

function getSuggestionValue(suggestion) {
	return suggestion.id;
}

function getSuggestions(value, suggestions) {
	const inputValue = value.trim().toLowerCase();
	const inputLength = inputValue.length;
	let count = 0;

	return inputLength === 0
		? []
		: suggestions.filter((suggestion) => {
			const keep = count < 5 && suggestion.id.toLowerCase().slice(0, inputLength) === inputValue;

			if (keep) {
				count += 1;
			}

			return keep;
		});
}

export default class TagSelector extends React.Component {
	state = {
		value: '',
		suggestions: [],
	};
	handleSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: getSuggestions(value, this.props.allTags),
		});
	};

	handleSuggestionsClearRequested = () => {
		this.setState({
			suggestions: [],
		});
	};

	handleChange = (event, { newValue }) => {
		this.setState({
			value: newValue,
		});
	};

	handleSuggestionSelected(event, { suggestion }) {
		this.props.onChange(uniq(this.props.value.concat([suggestion])));
	}
	render() {
		return (
			<div>
				{this.props.value.map(tag => <Chip label={tag.id} />)}
				<Autosuggest
					renderInputComponent={renderInput}
					suggestions={this.props.allTags}
					onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested.bind(this)}
					onSuggestionsClearRequested={this.handleSuggestionsClearRequested.bind(this)}
					renderSuggestionsContainer={renderSuggestionsContainer}
					getSuggestionValue={getSuggestionValue}
					renderSuggestion={renderSuggestion}
					onSuggestionSelected={this.handleSuggestionSelected.bind(this)}
					inputProps={{
						autoFocus: true,
						placeholder: 'Add a tag',
						value: this.state.value,
						onChange: this.handleChange.bind(this),
					}}
				/>
			</div>
		);
	}
}
