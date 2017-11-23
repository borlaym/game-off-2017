import { resolveCharacter } from './api';

const handler = {
	get(target, name) {
		if (name in target) {
			return target[name];
		}

		switch (name) {
			case 'character': {
				const { uid } = target.user;
				return resolveCharacter(uid);
			}
			default: return new Proxy({}, handler);
		}
	},
};

export default (object) => {
	if (!object) {
		return new Proxy({}, handler);
	}

	if (Object.prototype.hasOwnProperty.call(object, 'uid')) {
		return new Proxy({ user: object }, handler);
	}

	throw new Error('For now let\'s just wrap the user');
};
