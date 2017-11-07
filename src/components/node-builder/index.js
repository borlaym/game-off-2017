import * as React from 'react';
import { MentionsInput, Mention } from 'react-mentions';

export default class NodeBuilder extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event, value, plainTextValue, mentions) {
		console.log(value, mentions, plainTextValue);
		this.setState({
			value
		}, () => this.props.onChange(value));
	}

	render() {
		return (
			<MentionsInput value={this.state.value} onChange={this.handleChange}>
				<Mention trigger="["
					data={this.props.tags}
					style={{ backgroundColor: 'red' }}
				/>
			</MentionsInput>
		);
	}
}
