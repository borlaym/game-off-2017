
export function getDisplayName(WrappedComponent) { // eslint-disable-line import/prefer-default-export,max-len
	return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
