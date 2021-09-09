var http = require('http');

var host = 'localhost';
var port = '7990';
var url = 'http://' + host + ':' + port;
var auth = 'user:password';
var repo = 'my-repo';
var project = 'my-proj';
var branch = 'master';

var latestCommits = `/rest/api/1.0/projects/${project}/repos/${repo}/commits/?until=${branch}`;

var options = {
  host: host,
  port: port,
  method: 'GET',
  path: url + latestCommits,
  auth: auth,
};

callback = function (response) {
  var str = '';

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
