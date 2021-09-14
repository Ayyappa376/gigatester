var httpRequest = require('./httpRequest');

// https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#about

//const host = `ec2-34-234-42-134.compute-1.amazonaws.com`;
//const port = '9000';
//const user = 'admin';
//const password = 'Nim314bus';
const host = `p-gp2-sonarqube.imovetv.com`;
const port = '9000';
//const user = 'slingdevopscoe@dish.com';
//const password = 'DevopsCOE';
//const auth = `${user}:${password}`; //<api_token>
const apiToken = '84e26fc94ca8f563c4efcf493462d6cdc17626e2'; //name: doitright
const auth = `${apiToken}`; //<api_token>
const project = 'DYNA%3Adynamux'; //DYNA%3Adynamux, DYNA%3Akeystore, DYNA%3Akey-providers, DYNA%3Adynapack
const baseURL = `https://${host}:${port}/api/`; //http://<host>:<port>/api/

const metrics = 'bugs'; //ncloc,coverage,new_violations'; //comma seperated list of metrics keys

var getAllMetrics = 'metrics/search';
var getAllProjects = 'projects/search';
var getMeasures = `measures/search_history?component=${project}&metrics=${metrics}`;
var getMeasuresFromDate = `measures/search_history?component=${project}&metrics=${metrics}&from=2017-10-19`;
//var getMeasuresFromDate = `measures/search_history?component=${project}&metrics=${metrics}&from=2017-10-19T13:00:00+0200`;

httpRequest.httpRequest('GET', baseURL + getMeasures, undefined, auth)
.then((data) => console.log(data.body))
.catch((err) => console.log(err));

function prettyPrint(jsonString) {
  return JSON.stringify(JSON.parse(jsonString), null, 2);
}

/*
var options = {
  host: host,
  port: port,
  method: 'GET',
  path: baseURL + getAllMetrics,
  //  path: baseURL + getAllProjects,
  //  path: baseURL + getMeasures,
  //  path: baseURL + getMeasuresFromDate,
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
*/
