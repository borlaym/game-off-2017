// @flow

export type Visibility = 'public' | 'private' | 'hidden';

export type Tag = {
	name: string,
	text: string,
	gainsText?: string,
	losesText?: string,
	visibility: Visibility,
	modifiers: { [string]: number }
};

export type Character = {
	_uid: string,
	name: string,
	tags: Array<Tag>,
	_partyRef: string
};

export type TargetedTag = {
	target: 'SELF' | 'GLOBAL',
	tag: Tag
};

export type ResultingAction = {
	id: string,
	targetNode: string,
	effects?: {
		gainTags?: Array<TargetedTag>,
		loseTags?: Array<TargetedTag>
	}
}

export type Option = {
	id: string,
	conditions?: Array<string>,
	globalConditions?: Array<string>,
	skillCheck?: { [string]: number },
	text: string,
	logText?: string,
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

export type SaveStep = {
	_nodeRef: string,
	_characterRef: string,
	_actionID: string
};

export type Save = { [string]: SaveStep };

export type Party = {
	save: Save,
	participants: Array<Character>
};

export type Adventure = {
	starter: Node,
	[string]: Node
};

export type LogEntry = {
	text: string,
	timestamp: number
};

export type GameState = {
	globalTags: Array<Tag>,
	characters: Array<Character>,
	player: Character,
	currentNode: Node,
	log: Array<LogEntry>
};
