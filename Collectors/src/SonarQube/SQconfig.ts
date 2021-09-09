export const SQconfig = {
	name: "SonarQube",
};

export interface ISonarJobInfo {
	teamId: string;
	toolName: string;
	projectName: string;
	url: string;
	userName: string;
	appToken: string;
	metrics: string[];
}
