import * as React from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import AuthComponent from '../auth'

class AppBarExampleComposition extends React.Component {
	render() {
		return (
			<div>
				<AppBar
					title="Title"
					iconElementLeft={
						<IconButton>
							<NavigationClose />
						</IconButton>
					}
					iconElementRight={
						<AuthComponent />
					}
				/>
			</div>
		);
	}
}

export default AppBarExampleComposition;
