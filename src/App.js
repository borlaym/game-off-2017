import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from './components/appbar';

class App extends Component {
	render() {
		return (
			<MuiThemeProvider>
				<AppBar />
			</MuiThemeProvider>
		);
	}
}

export default App;
