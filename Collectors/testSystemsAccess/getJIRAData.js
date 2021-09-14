//var https = require('https');
var httpRequest = require('./httpRequest');

// https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#about

//const host = `pinimbus.atlassian.net`;
//const port = '443';
//const email = 'gargi.basak@pinimbus.com';
//const token = 'edDUapfZR3ZiDe1IhBk4E32A';
const host = `p-jira.imovetv.com`;
const email = 'slingdevopscoe@dish.com'; //'service-cmw@sling.com';
const token = 'DevopsCOE'; //'fL9kXGVPXBovJ6Yb7faXDpLsqWYDTibwffW8cbxpX2gtMH3xE7Ue2AWzAOqR9yk';
const auth = `${email}:${token}`; //email@example.com:<api_token>
const project = 'IN'; //'Web%20Tools', 'iOS'
const baseURL = `https://${host}/rest/api/latest/`; //https://<site-url>/rest/api/3/<resource-name>
const header = 'Accept: application/json';
const issue = '252072';
const issueKey = 'CMW-3257';
const toDate = '2021-6-16%207:34';
const fromDate = '2021-6-18%203:45';
const fieldId = 'customfield_12903'

var getAllProjects = 'project';
var getAllIssuesOfProject = `search?jql=project%3D%27${project}%27`;
var getAllIssuesOfProjectMaxResults = `search?jql=project%3D%27${project}%27&startAt=0&maxResults=0`;
var getAllIssuesOfProjectCreatedAfterAndBefore = `search?jql=project%3D%27${project}%27%20AND%20created%3E%3D%27${fromDate}%27%20AND%20created%3C%3D%27${toDate}%27&startAt=0&maxResults=1`;
var getAllIssuesOfProjectUpdatedAfterAndBefore = `search?jql=project%3D%27${project}%27%20AND%20updated%3E%3D%27${fromDate}%27%20AND%20updated%3C%3D%27${toDate}%27&startAt=0&maxResults=0`;
var getAllIssueTypes = 'issuetype';
var getAllPriorities = 'priority';
var getAllStatuses = 'status';
var getAllResolutions = 'resolution';
var getDetailsOfAnIssue = `issue/${issue}`; //issue/{issueIdOrKey}
var getAllWorklogsForAnIssue = `issue/${issue}/worklog`; //issue/{issueIdOrKey}/worklog
var getAllChangelogForAnIssue = `issue/${issue}?expand=changelog`; //issue/{issueIdOrKey}/worklog
var getAllIssueFields = `field`;
var getFieldOptions = `field/${fieldId}/option`;

// https://pinimbus.atlassian.net/rest/api/3/search/?jql=project%20%3D%20%27DoItRight%27%20AND%20created%3E%3D%272021-01-14%2018:00%27%20AND%20created%3C%3D%272021-01-31%27
// https://pinimbus.atlassian.net/rest/api/3/search/?jql=updatedDate%3E%3D%272021-01-14%2018:30%27%20AND%20updatedDate%3C%3D%272021-01-31%27

httpRequest.httpRequest('GET', baseURL + getIssuesOfProjectWithCustomField, undefined, auth, { Accept: 'application/json' })
.then((data) => console.log(prettyPrint(data.body)))
.catch((err) => console.log(err));

function prettyPrint(jsonString) {
  return JSON.stringify(JSON.parse(jsonString), null, 2);
}

/*
https://p-jira.imovetv.com/rest/api/latest/issue/{issueIdorKey}?expand=changelog
This is the changelog structure:

  "changelog": {
    "startAt": 0,
    "maxResults": 10,
    "total": 10,
    "histories": [
      {
        "id": "2842753",
        "author": {
          "self": "https://p-jira.imovetv.com/rest/api/2/user?username=devopsjenkins%40echostar.com",
          "name": "devopsjenkins@echostar.com",
          "key": "devopsjenkins@echostar.com",
          "emailAddress": "devopsjenkins@echostar.com",
          "avatarUrls": {
            "48x48": "https://www.gravatar.com/avatar/c2435007d0fa4ea132633f6fffc92150?d=mm&s=48",
            "24x24": "https://www.gravatar.com/avatar/c2435007d0fa4ea132633f6fffc92150?d=mm&s=24",
            "16x16": "https://www.gravatar.com/avatar/c2435007d0fa4ea132633f6fffc92150?d=mm&s=16",
            "32x32": "https://www.gravatar.com/avatar/c2435007d0fa4ea132633f6fffc92150?d=mm&s=32"
          },
          "displayName": "Service Devopsjenkins",
          "active": true,
          "timeZone": "America/Denver"
        },
        "created": "2021-02-25T06:26:12.472+0000",
        "items": [
          {
            "field": "Link",
            "fieldtype": "jira",
            "from": null,
            "fromString": null,
            "to": "SR-15442",
            "toString": "This issue relates to SR-15442"
          }
        ]
      },
      ...
    ]


changelog.histories[i].items[j].field == 'status' when the status of the issue was changed.
changelog.histories[i].author.name gives the name of who made the change.
changelog.histories[i].created gives when the change was made.
*/