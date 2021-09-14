//var https = require('https');
var httpRequest = require('./httpRequest');

// https://github.com/jenkinsci/pipeline-stage-view-plugin/tree/master/rest-api#get-jobjob-namewfapiruns
// https://plugins.jenkins.io/pipeline-rest-api/
// https://www.jenkins.io/doc/book/using/remote-access-api/

//const host = 'ec2-54-146-28-214.compute-1.amazonaws.com';
//const port = '8080';
//const jenkinsURL = 'http://' + host + ':' + port;
//const user = 'JenkinsAdmin';
//const pass = '3.14Nimbus';
//const job = 'DoItRightBuild';

const host = 'p-gp2-opsjenkins-1.imovetv.com'; //'p-gp2-dynajenkins-1.imovetv.com' 'p-gp2-cmwjenkins-1.imovetv.com' 'p-gp2-bigdatajenkins-1.imovetv.com'
//const job = 'web-tools-auditing/job/master'; //'web-tools-auditing' 'web-tools-sso-portal';
const job = "PROD_CMWNEXT_AUTO_DEPLOY"; // cmwnext-user/job/CECORE-1696";
const build = '982'; //'222';

const user = 'slingdevopscoe@dish.com'; //'service-cmw@sling.com';
const pass = 'DevopsCOE'; //'fL9kXGVPXBovJ6Yb7faXDpLsqWYDTibwffW8cbxpX2gtMH3xE7Ue2AWzAOqR9yk';
const jenkinsURL = `https://${host}`;
const auth = `${user}:${pass}`;

//var getAllInfo = '/api/json?pretty=true';
//var getAllJobs = '/api/json?tree=jobs[name,firstBuild[number],builds[number],nextBuildNumber]&pretty=true';
//var getAllJobs1 = '/api/json?tree=jobs[name,color,url]&pretty=true';
//var getAllJobs2 = '/api/json?tree=jobs[name,builds[number,actions[parameters[name,value]]]]&pretty=true';
//var getAllJobs3 = '/api/json?tree=jobs[name,color,url,buildable,color,nextBuildNumber,builds[number,status,timestamp,url,result],healthReport[score,description]]&pretty=true';
//var getAllJobs4 = '/api/json?tree=jobs[name,url,nextBuildNumber]&pretty=true';
var getAllJobs5 = '/api/json?tree=jobs[name]&pretty=true';
//var getJobDetails1 = `/job/${job}/api/json?tree=jobs[name,url,firstBuild[number],nextBuildNumber,builds[number,building,result,timestamp,duration,estimatedDuration,actions[remoteUrls,lastBuiltRevision[branch[name]]]]]&pretty=true`;
var getJobDetails2 = `/job/${job}/api/json?tree=jobs[name]`;
//var getJobDetails3 = `/job/${job}/api/json?tree=jobs[name,url,nextBuildNumber]&pretty=true`;
//var getAllJobDetails1 = `/job/${job}/api/json?pretty=true`;
var getAllJobDetails2 = `/job/${job}/api/json?tree=firstBuild[number],nextBuildNumber`;
//var getAllBuilds1 = `/job/${job}/api/json?tree=builds[number,building,timestamp,id,queueId,url,result]&pretty=true`;
//var getAllBuilds2 = `/job/${job}/api/json?tree=builds[number,building,result,timestamp,duration,estimatedDuration,actions[remoteUrls,lastBuiltRevision[branch[name]]]]&pretty=true`;
//var getBuildNumberInfo1 = `/job/${job}/${build}/api/json?pretty=true`;
var getBuildNumberInfo2 = `/job/${job}/${build}/api/json?tree=number,building,result,timestamp,duration,estimatedDuration,actions[remoteUrls,lastBuiltRevision[branch[name]]]&pretty=true`;
var getBuildNumberInfo3 = `/job/${job}/${build}/api/json?tree=number,building,result,timestamp,duration,url&pretty=true`;
//var getLastBuildInfo1 = `/job/${job}/lastBuild/api/json?pretty=true`;
//var getLastBuildInfo2 = `/job/${job}/lastBuild/api/json?tree=number&pretty=true`;
//var getLastBuildProgress1 = `/job/${job}/lastBuild/api/json?tree=result,timestamp,estimatedDuration&pretty=true`;
var getPipelineStageInfo = `/job/${job}/wfapi/runs`;
var getPipelineRunStageInfo = `/job/${job}/${build}/wfapi/describe`;

httpRequest.httpRequest('GET', jenkinsURL + getPipelineRunStageInfo, undefined, auth)
.then((data) => {
  console.log("Received ------------------------------");
  console.log(data.statusCode);
  console.log(data.headers);
  console.log(prettyPrint(data.body));
})
.catch((err) => console.log(err));

function prettyPrint(jsonString) {
  return JSON.stringify(JSON.parse(jsonString), null, 2);
}
/*
NOT_EXECUTED,
ABORTED,
SUCCESS,
IN_PROGRESS,
PAUSED_PENDING_INPUT,
FAILED,
UNSTABLE,
*/
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
