var https = require('https');

// https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#about

const host = `pinimbus.atlassian.net`;
//const port = '80';
const email = 'gargi.basak@pinimbus.com';
const token = 'edDUapfZR3ZiDe1IhBk4E32A';
const auth = `${email}:${token}`; //email@example.com:<api_token>
const project = 'GigaTester';
const baseURL = `https://${host}/rest/api/3/`; //https://<site-url>/rest/api/3/<resource-name>
const header = 'Accept: application/json';

var getAllProjects = 'project/search';
var getAllIssuesOfProject = `search?jql=project%20%3D%20${project}`;
var getAllIssuesOfProjectMaxResults = `search?jql=project%20%3D%20${project}&maxResults=2`;
var getAllIssuesOfProjectCreatedAfterAndBefore = `search?jql=project%20%3D%20%27${project}%27%20AND%20created%3E%3D%272021-01-14%2018:00%27%20AND%20created%3C%3D%272021-01-31%27`;
var getAllIssuesOfProjectUpdatedAfterAndBefore = `search?jql=project%20%3D%20%27${project}%27%20AND%20updatedDate%3E%3D%272021-01-14%2018:00%27%20AND%20updatedDate%3C%3D%272021-01-31%27`;
var getAllIssueTypes = 'issuetype';
var getAllPriorities = 'priority';
var getAllStatuses = 'status';
var getAllResolutions = 'resolution';
var getDetailsOfAnIssue = 'issue/DIR-1'; //issue/{issueIdOrKey}
var getAllWorklogsForAnIssue = 'issue/DIR-11/worklog'; //issue/{issueIdOrKey}/worklog

// https://pinimbus.atlassian.net/rest/api/3/search/?jql=project%20%3D%20%27DoItRight%27%20AND%20created%3E%3D%272021-01-14%2018:00%27%20AND%20created%3C%3D%272021-01-31%27
// https://pinimbus.atlassian.net/rest/api/3/search/?jql=updatedDate%3E%3D%272021-01-14%2018:30%27%20AND%20updatedDate%3C%3D%272021-01-31%27

var options = {
  host: host,
  //  port: port,
  method: 'GET',
  //  path: baseURL + getAllProjects,
  //  path: baseURL + getAllIssuesOfProject,
  //  path: baseURL + getAllIssuesOfProjectMaxResults,
  //  path: baseURL + getAllIssuesOfProjectCreatedAfterAndBefore,
  path: baseURL + getAllIssuesOfProjectUpdatedAfterAndBefore,
  //  path: baseURL + getAllIssueTypes,
  //  path: baseURL + getAllPriorities,
  //  path: baseURL + getAllStatuses,
  //  path: baseURL + getAllResolutions,
  //  path: baseURL + getDetailsOfAnIssue,
  //  path: baseURL + getAllWorklogsForAnIssue,
  auth: auth,
  headers: { header },
};

callback = function (response) {
  var str = '';

  // console.log(response.statusCode);

  response.on('error', (err) => {
    // This prints the error message and stack trace to `stderr`.
    console.error(err.stack);
  });

  //another chunk of data has been received, so append it to `str`
  response.on('data', function (chunk) {
    str += chunk;
  });

  //the whole response has been received, so we just print it out here
  response.on('end', function () {
    console.log(prettyPrint(str));
  });
};

function prettyPrint(jsonString) {
  return JSON.stringify(JSON.parse(jsonString), null, 2);
}

https.request(options, callback).end();

// check the cides at https://nodejs.dev/learn/making-http-requests-with-nodejs
// https://stackoverflow.com/questions/3905126/how-to-use-http-client-in-node-js-if-there-is-basic-authorization
// https://gist.github.com/justlaputa/5634984
