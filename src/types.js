// @flow

export type Visibility = 'public' | 'private' | 'hidden';

export type Tag = {
	id: string,
	name: string,
	description: string,
	gainsText?: string,
	losesText?: string,
	visibility: Visibility
};

export type Character = {
	id: string,
	name: string,
	tags: Array<Tag>,
	sex: 'male' | 'female'
};

export type TargetedTag = {
	target: 'SELF' | 'GLOBAL',
	tag: Tag
};

export type ResultingAction = {
	id: string,
	targetNode: string,
	effects: {
		gainTags?: Array<TargetedTag>,
		loseTags?: Array<TargetedTag>
	}
}

export type Option = {
	id: string,
	conditions: Array<string>,
	globalConditions: Array<string>,
	skillCheck?: { [string]: number },
	text: string,
	logText: string,
	resultingAction: ResultingAction,
	failedResultingAction?: ResultingAction
};

export type Node = {
	id: string,
	text: string,
	blocker?: boolean,
	inGameTimestamp: string,
	options: Array<Option>
};
