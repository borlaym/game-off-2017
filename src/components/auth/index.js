import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { auth, isAuthenticated } from '../../firebase';

import { getDisplayName } from '../../utils/debug';

export const withUser = WrappedComponent =>
	class extends Component {
		static displayName = `withUser(${getDisplayName(WrappedComponent)})`;

		state = {
			user: null,
		};

		componentDidMount() {
			auth.onAuthStateChanged((user) => {
				if (user) {
					const { uid, displayName } = user;
					this.setState({ user: { uid, displayName } });
				} else {
					this.setState({ user: null });
				}
			});
		}

		render() {
			const { user } = this.state;
			return <WrappedComponent {...this.props} user={user} />;
		}
	};

function componentFunction(props, renderProps) {
	const { component: WrappedComponent, render, user } = props;
	return WrappedComponent ? (
		<WrappedComponent {...renderProps} user={user} />
	) : (
		render({ user, ...renderProps })
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
		component, render, user, ...routeProps
	} = props;
	return <Route {...routeProps} render={() => renderFunction(props)} />;
});
