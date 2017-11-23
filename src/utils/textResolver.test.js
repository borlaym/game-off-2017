import resolveText from './textResolver';

const maleCharacter = {
	sex: 'male',
	name: 'Joe',
	tags: ['PILOT', 'ENGINEER'].map(_ => ({ id: _ })),
};

const femaleCharacter = {
	sex: 'female',
	name: 'Sarah',
	tags: ['OUTLAW'].map(_ => ({ id: _ })),
};

describe('resolve text', () => {
	it('Resolves XE, XYR, XYRS', () => {
		const result = resolveText({
			template: 'Should XE escape, we will be on XYRS tail. Keep XYR locked up.',
			character: maleCharacter,
		});
		expect(result).toMatchSnapshot();
		const result2 = resolveText({
			template: 'Should XE escape, we will be on XYRS tail. Keep XYR locked up.',
			character: femaleCharacter,
		});
		expect(result2).toMatchSnapshot();
	});
	it('Resolves NAME', () => {
		const result = resolveText({
			template: 'NAME is a dangerous individual.',
			character: maleCharacter,
		});
		expect(result).toMatchSnapshot();
	});
	it('Resolves template strings', () => {
		const template = '{% if (o.character.tags.PILOT) { %}Piloting was great for XYR.{% } else { %}Piloting was not XYRS thing.{% } %}';
		const result = resolveText({
			template,
			character: maleCharacter,
		});
		expect(result).toMatchSnapshot();
		const result2 = resolveText({
			template,
			character: femaleCharacter,
		});
		expect(result2).toMatchSnapshot();
	});
});
