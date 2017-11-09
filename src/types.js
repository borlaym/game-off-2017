// @flow

export type Visibility = 'public' | 'private' | 'hidden';

export type Tag = {
	name: string,
	text: string,
	visibility : Visibility,
	modifiers: { [string]: number }
};

export type TargetedTag = {
	target: 'SELF' | 'GLOBAL',
	tag : Tag
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
	conditions: Array<string>,
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