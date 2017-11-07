import * as React from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import './style.css';

export default class NodeBuilder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.renderSuggestion = this.renderSuggestion.bind(this);
	}

	handleChange(event, value, plainTextValue, mentions) {
		this.setState({
			value
		}, () => this.props.onChange(value));
	}

	renderSuggestion(entry, search, highlightedDisplay, index) {
		return (
			<div className="tag-suggestion">
				{entry.display}
			</div>
		);
	}

	render() {
		return (
			<div className="node-builder">
				<h3>Node text</h3>
				<MentionsInput
					className="text-input"
					value={this.state.value}
					onChange={this.handleChange}
					displayTransform={(id, display, type) => `[${display}]`}
				>
					<Mention trigger="["
						data={this.props.tags}
						renderSuggestion={this.renderSuggestion}
					/>
				</MentionsInput>
			</div>
		);
	}
}
