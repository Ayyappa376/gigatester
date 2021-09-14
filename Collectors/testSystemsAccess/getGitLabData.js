var httpRequest = require('./httpRequest');
const { exec } = require('child_process');

// https://docs.gitlab.com/ee/api/
// https://docs.gitlab.com/ee/api/projects.html
// https://docs.gitlab.com/ee/api/pipelines.html
// https://docs.gitlab.com/ee/ci/pipelines/
//curl "http://p-gp2-gitlab-1.imovetv.com/api/v4/projects?private_token=zNgXNYQCjJmMj4ageSBx"
//curl --header "Authorization: Bearer zNgXNYQCjJmMj4ageSBx" "http://p-gp2-gitlab-1.imovetv.com/api/v4/projects"
//curl --request GET --header "PRIVATE-TOKEN: zNgXNYQCjJmMj4ageSBx" "http://p-gp2-gitlab-1.imovetv.com/api/v4/projects?pagination=keyset&per_page=50&order_by=id&sort=asc"
//https://wiki.movenetworks.com/pages/viewpage.action?spaceKey=FAL&title=Bulk+migration+of+Bitbucket+Repos+to+Gitlab+Saas
//https://docs.gitlab.com/ee/api/search.html

//const email = 'sling.devopscoe';

const host = `p-gp2-gitlab-1.imovetv.com`; //gitlab oss
const token = 'zNgXNYQCjJmMj4ageSBx'; //gitlab oss
const baseURL = `http://${host}/api/v4/`; //gitlab oss
const groupId = '';
const projectId = '246'; //'18'; //'300'; //gitlab oss
const pipelineId = '980'; //'61805'; //gitlab oss
//const commitSHA = '0fda4b20'; //'5e0c4e5a';
const branchName = 'add-test-coverage';
const commitId = '5eb54021663d1928d313bcb5007c71a9e2213735';

//const host = 'gitlab.com'; //gitlab saas
//const token = '972H4rpDnsyF9YB7tsBN'; //gitlab saas
//const baseURL = `https://${host}/api/v4/`; //gitlab saas
//const groupId = '12282487'; //'11001516/groups/12253548/groups/12282487'; //only for gitlab saas
//const projectId = '27209474'; //'25066110'; //gitlab saas
//const pipelineId = ''; //gitlab saas

//const repo = '';
//const commitId = '';
//const pullId = '';
const auth = `Bearer ${token}`;
const header = { Authorization: auth, Accept: '*/*', 'User-Agent': 'nodejs' }; //{ 'PRIVATE-TOKEN': token };
const pageLimit = 100; //max page limit can be 100 
const fromDate = '2021-03-15T08:00:00Z';
const toDate = '2021-05-15T08:00:00Z';

var getAllProjects = 'projects';
var getAllProjectSimple = 'projects?simple=true';
var getAllProjectsByPage = `projects?simple=true&page=1&per_page=${pageLimit}`;
var getProjectById = `projects/${projectId}`;

var getAllMergeRequests = 'merge_requests?scope=all';
var getAllMergeRequestsByPage = `merge_requests?scope=all&page=1&per_page=${pageLimit}`;
var getAllMergeRequestsOfProject = `projects/${projectId}/merge_requests?scope=all`;
var getAllMergeRequestsOfProjectByPage = `projects/${projectId}/merge_requests?scope=all&page=1&per_page=${pageLimit}`;
var getAllMergeRequestsOfProjectCreatedBeforeAfter = `projects/${projectId}/merge_requests?scope=all&created_after=${fromDate}&created_before=${toDate}`;
var getAllMergeRequestsOfProjectUpdatedBeforeAfter = `projects/${projectId}/merge_requests?scope=all&updated_after=${fromDate}&updated_before=${toDate}`;

var getAllCommits = `projects/${projectId}/repository/commits`;
var getAllCommitsOfBranch = `projects/${projectId}/repository/commits?ref_name=${branchName}`;
var getCommitDetailsById = `projects/${projectId}/repository/commits/${commitId}`;
//var getCommitDetailsBySHA = `projects/${projectId}/repository/commits/${commitSHA}`;
//var getCommitDetailsByBranch = `projects/${projectId}/repository/commits/${branchName}`;
var getAllRefsOfCommit = `projects/${projectId}/repository/commits/${commitId}/refs`;

var getAllGroups = `groups`;
var getForGroup = `groups/${groupId}/`;
var getAllSubGroupsOfGroup = `subgroups`;
var getAllDescendantGroupsOfGroup = `descendant_groups`;

var getAllPipelinesOfProject = `projects/${projectId}/pipelines`;
var getAllPipelinesOfProjectByPage = `projects/${projectId}/pipelines?page=1&per_page=${pageLimit}`;
var getAllPipelinesOfProjectCreatedBeforeAfter = `projects/${projectId}/pipelines?created_after=${fromDate}&created_before=${toDate}`;
var getAllPipelinesOfProjectUpdatedBeforeAfter = `projects/${projectId}/pipelines?updated_after=${fromDate}&updated_before=${toDate}`;
var getPipelineDetailsOfProject = `projects/${projectId}/pipelines/${pipelineId}`;
var getPipelineJobsOfProject = `projects/${projectId}/pipelines/${pipelineId}/jobs?per_page=100`;

//var url = `http://p-gp2-gitlab-1.imovetv.com/api/v4/projects/127/pipelines&updated_after=2021-06-8T13:39:00Z&updated_before=2021-06-15T8:2:00Z&page=1&per_page=100`;
//var url = `http://p-gp2-gitlab-1.imovetv.com/api/v4/projects/127/pipelines?updated_before=2021-06-15T8:2:00Z&page=1&per_page=1`;
//var url = `https://gitlab.com/api/v4/groups/${groupId}/search?scope=projects&search=%27popular-searches%27`;
//https://gitlab.com/api/v4/groups/search?search=%27dish-cloud/sling/bigdata%27&private_token=972H4rpDnsyF9YB7tsBN

//httpRequest.httpRequest('GET', `${baseURL}${getAllProjects}?private_token=${token}`)
//httpRequest.httpRequest('GET', `${baseURL}${getForGroup}${getAllSubGroupsOfGroup}`, undefined, undefined, header) //gitlab saas
httpRequest.httpRequest('GET', `${baseURL}${getAllCommitsOfBranch}`, undefined, undefined, header) //gitlab oss
//httpRequest.httpRequest('GET', `${url}`, undefined, undefined, header)
.then((data) => {
  console.log(data.statusCode);
  console.log(data.headers);
  console.log(prettyPrint(data.body));
})
//.then((data) => console.log(prettyPrint(data.body)))
.catch((err) => console.log(err));

function prettyPrint(jsonString) {
  return JSON.stringify(JSON.parse(jsonString), null, 2);
}

/*
exec(`curl -v -H "Authorization:  Bearer ${token}" ${baseURL}${getAllProjects}`, function (error, stdout, stderr) {
//exec(`curl -v ${baseURL}${getAllProjects}?private_token=${token}`, function (error, stdout, stderr) {
  if (error) {
    console.log(`error: ${error.message}`);
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
  }
  console.log(`stdout: ${stdout}`);
});
*/
