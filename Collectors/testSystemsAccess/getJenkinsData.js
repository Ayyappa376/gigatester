var http = require('http');

const host = 'ec2-54-146-28-214.compute-1.amazonaws.com';
const port = '8080';
const jenkinsURL = 'http://' + host + ':' + port;
const auth = 'JenkinsAdmin:3.14Nimbus';
const job = 'DoItRightBuild';

var getAllInfo = '/api/json?pretty=true';

var getAllJobs1 = '/api/json?tree=jobs[name,color,url]&pretty=true';
var getAllJobs2 =
  '/api/json?tree=jobs[name,builds[number,actions[parameters[name,value]]]]&pretty=true';
var getAllJobs3 =
  '/api/json?tree=jobs[name,color,url,buildable,color,nextBuildNumber,builds[number,status,timestamp,url,result],healthReport[score,description]]&pretty=true';
var getAllJobs4 = '/api/json?tree=jobs[nextBuildNumber]&pretty=true';

var getAllBuilds1 = `/job/${job}/api/json?tree=builds[number,building,timestamp,id,queueId,url,result]&pretty=true`;
var getAllBuilds2 = `/job/${job}/api/json?pretty=true`;
var getAllBuilds3 = `/job/${job}/api/json?tree=builds[number,building,result,timestamp,duration,estimatedDuration,actions[remoteUrls,lastBuiltRevision[branch[name]]]]&pretty=true`;

var getBuildNumberInfo1 = `/job/${job}/1/api/json?pretty=true`;
var getBuildNumberInfo2 = `/job/${job}/1/api/json?tree=number,building,result,timestamp,duration,estimatedDuration,actions[remoteUrls,lastBuiltRevision[branch[name]]]&pretty=true`;

var getLastBuildInfo1 = `/job/${job}/lastBuild/api/json?pretty=true`;
var getLastBuildInfo2 = `/job/${job}/lastBuild/api/json?tree=number&pretty=true`;
var getLastBuildProgress1 = `/job/${job}/lastBuild/api/json?tree=result,timestamp,estimatedDuration&pretty=true`;

var getAllJobs =
  '/api/json?tree=jobs[name,builds[number],nextBuildNumber]&pretty=true';
var getBuildNumberInfo = `/job/${job}/1/api/json?pretty=true`;

var options = {
  host: host,
  port: port,
  method: 'GET',
  path: jenkinsURL + getAllInfo,
  //  path: jenkinsURL + getAllJobs4,
  //  path: jenkinsURL + getAllBuilds3,
  //  path: jenkinsURL + getLastBuildInfo2,
  //  path: jenkinsURL + getBuildNumberInfo1,
  //  path: jenkinsURL + getLastBuildProgress1,
  auth: auth,
};

callback = function (response) {
  var str = '';

  console.log(response.statusCode);

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
    console.log(str);
  });
};

http.request(options, callback).end();

// check the cides at https://nodejs.dev/learn/making-http-requests-with-nodejs
// https://stackoverflow.com/questions/3905126/how-to-use-http-client-in-node-js-if-there-is-basic-authorization
// https://gist.github.com/justlaputa/5634984
