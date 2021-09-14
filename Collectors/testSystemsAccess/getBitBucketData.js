var httpRequest = require('./httpRequest');

// https://developer.atlassian.com/bitbucket/api/2/reference/resource/

const host = `p-bitbucket.imovetv.com`;
const email = 'slingdevopscoe@dish.com'; //'service-cmw@sling.com';
const token = 'DevopsCOE'; //'fL9kXGVPXBovJ6Yb7faXDpLsqWYDTibwffW8cbxpX2gtMH3xE7Ue2AWzAOqR9yk';
const auth = `${email}:${token}`; //email@example.com:<api_token>
const project = 'AA';
const baseURL = `https://${host}/rest/api/latest/`; //https://<site-url>/rest/api/1.0/<path-to-resource>
const header = 'Accept: application/json';
const repo = 'search-service'; //'lcache_salt' 'acache_salt' 'helper_scripts' 'ffmpeg-fingerprint' 'exoplayer' 'dyna_qa' 'jeremy_diagrams' 'dynapack';
const commitId = 'b28fdaa4a7c';
const pullId = '48';
const pageLimit = 5; //max limit can be 1000

//state is OPEN, DECLINED or MERGED

var getAllProjects = 'projects';
var getAllProjectsByPage = `projects?start=0&limit=${pageLimit}`;
var getAllReposOfProj = `projects/${project}/repos`;
var getAllReposOfProjByPage = `projects/${project}/repos?start=0&limit=${pageLimit}`;
var getAllBranchsOfRepo = `projects/${project}/repos/${repo}/branches`;
var getDefaultBranchOfRepo = `projects/${project}/repos/${repo}/branches/default`;
var getAllCommitsOfRepo = `projects/${project}/repos/${repo}/commits`;
var getCommitDetailsOfRepo = `projects/${project}/repos/${repo}/commits/${commitId}`;
var getAllPullRequestsOfRepo = `projects/${project}/repos/${repo}/pull-requests`;
var getAllPullRequestsOfRepoByPage = `projects/${project}/repos/${repo}/pull-requests?state=ALL&start=1&limit=${pageLimit}`;
var getPullRequestDetailsOfRepo = `projects/${project}/repos/${repo}/pull-requests/${pullId}`;

httpRequest.httpRequest('GET', baseURL + getAllReposOfProj , undefined, auth, { Accept: 'application/json' })
.then((data) => console.log(prettyPrint(data.body)))
.catch((err) => console.log(err));

function prettyPrint(jsonString) {
  return JSON.stringify(JSON.parse(jsonString), null, 2);
}
