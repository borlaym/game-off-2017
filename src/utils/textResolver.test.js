import resolveText from './textResolver';

const maleCharacter = {
	sex: 'male',
	name: 'Joe',
	tags: ['PILOT', 'ENGINEER'].map(_ => ({ name: _ })),
};

const femaleCharacter = {
	sex: 'female',
	name: 'Sarah',
	tags: ['OUTLAW'].map(_ => ({ name: _ })),
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
});
