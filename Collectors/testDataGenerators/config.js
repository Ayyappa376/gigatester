exports.config = {
	env: 'dev',
	region: 'us-east-1',
//	elasticSearchURL: 'http://localhost:9200',
	elasticSearchURL: 'http://ec2-34-234-42-134.compute-1.amazonaws.com:9200',
	elasticSearchUser: 'gigatester-user',
	elasticSearchPass: 'pinimbus',

	teamTable: 'Team',

	stateIndex: 'state-data',

	buildIndex: 'build-data',
	qualityIndex: 'quality-data',
	repoIndex: 'repo-data',
	reqIndex: 'req-data',
	incidentIndex: 'incident-data',
	gitlabCommitIndex: 'gitlab-commit-data'
};
