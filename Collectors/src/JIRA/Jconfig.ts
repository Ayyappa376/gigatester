export const Jconfig = {
	name: "JIRA",
};

export interface IJIRAJobInfo {
	teamId: string;
	toolName: string;
	projectName: string;
	url: string;
	email: string;
	appToken: string;
	items: string[];
	newState: string;
	startState: string;
	closeState: string;
}
