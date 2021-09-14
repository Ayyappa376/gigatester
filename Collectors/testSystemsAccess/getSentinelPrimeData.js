var httpRequest = require('./httpRequest');

//  https://p-sentinel-prime.aws.imovetv.com/jira/team-mapping

const host = `p-sentinel-prime.aws.imovetv.com`;
//const email = 'slingdevopscoe@dish.com'; //'service-cmw@sling.com';
//const token = 'DevopsCOE'; //'fL9kXGVPXBovJ6Yb7faXDpLsqWYDTibwffW8cbxpX2gtMH3xE7Ue2AWzAOqR9yk';
//const auth = `${email}:${token}`; //email@example.com:<api_token>
const baseURL = `https://${host}/`; //https://<site-url>/rest/api/1.0/<path-to-resource>

var getJIRATeamMapping = 'jira/team-mapping';

httpRequest.httpRequest('GET', baseURL + getJIRATeamMapping , undefined, undefined)
.then((data) => console.log(prettyPrint(data.body)))
.catch((err) => console.log(err));

function prettyPrint(jsonString) {
  return JSON.stringify(JSON.parse(jsonString), null, 2);
}
