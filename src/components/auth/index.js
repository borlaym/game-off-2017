import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { isAuthenticated } from '../../firebase';

import { getDisplayName } from '../../utils/debug';

import resolveGameData from '../../utils/gameDataProxy';

export const withUser = WrappedComponent =>
	class extends Component {
		static displayName = `withUser(${getDisplayName(WrappedComponent)})`;

		state = {
			gameData: new Promise((resolve) => {
				resolveGameData().then((gameData) => {
					resolve(gameData);
				});
			}),
		};

		render() {
			const { gameData } = this.state;
			return <WrappedComponent {...this.props} gameData={gameData} />;
		}
	};

function componentFunction(props, renderProps) {
	const { component: WrappedComponent, render, gameData } = props;
	return WrappedComponent ? (
		<WrappedComponent {...renderProps} gameData={gameData} />
	) : (
		render({ gameData, ...renderProps })
	);
}

function renderFunction(props, renderProps) {
	return isAuthenticated() ? (
		componentFunction(props, renderProps)
	) : (
		<Redirect
			to={{
				pathname: '/login',
				state: { from: renderProps.location },
			}}
		/>
	);
}

export const RouteWithAuth = withUser((props) => {
	const {
		component, render, gameData, ...routeProps
	} = props;
	return <Route {...routeProps} render={renderProps => renderFunction(props, renderProps)} />;
});
