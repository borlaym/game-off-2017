import * as React from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import './style.css';

export default class NodeBuilder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			options: ['']
		};
		this.handleTextChange = this.handleTextChange.bind(this);
		this.renderSuggestion = this.renderSuggestion.bind(this);
		this.addOption = this.addOption.bind(this);
	}

	handleTextChange(event, value, plainTextValue, mentions) {
		this.setState({
			text: value
		}, () => this.props.onChange(value));
	}

	renderSuggestion(entry, search, highlightedDisplay, index) {
		return (
			<div className="tag-suggestion">
				{entry.display}
			</div>
		);
	}

	handleOptionChange(index, event, value) {
		const newOptions = [
			...this.state.options.slice(0, index),
			value,
			...this.state.options.slice(index + 1)
		];
		this.setState({
			options: newOptions
		});
	}

	addOption() {
		this.setState({
			options: [...this.state.options, '']
		});
	}

	render() {
		return (
			<div className="node-builder">
				<h3>Node text</h3>
				<MentionsInput
					className="text-input"
					value={this.state.text}
					onChange={this.handleTextChange}
					displayTransform={(id, display, type) => `[${display}]`}
				>
					<Mention trigger="["
						data={this.props.tags}
						renderSuggestion={this.renderSuggestion}
					/>
				</MentionsInput>
				<h3>Options</h3>
				{this.state.options.map((option, index) => (
					<div key={index}>
						<MentionsInput
							className="option-input"
							value={option}
							onChange={this.handleOptionChange.bind(this, index)}
							displayTransform={(id, display, type) => `[${display}]`}
						>
						<Mention trigger="["
							data={this.props.tags}
							renderSuggestion={this.renderSuggestion}
						/>
						</MentionsInput>

					</div>
				))}
				<button className="add-option" onClick={this.addOption}>
					Add option
				</button>
			</div>
		);
	}
}
