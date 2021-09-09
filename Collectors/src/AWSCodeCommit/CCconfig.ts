export const CCconfig = {
	name: "AWSCodeCommit",
//	codeCommitTable: 'codeCommitData',
//	codeCommitTable: 'repoData',
};

export interface IAWSCodeCommitJobInfo {
	teamId: string;
	toolName: string;
	url: string;
	userName: string;
	password: string;
	region: string;
	repoName: string;
}
