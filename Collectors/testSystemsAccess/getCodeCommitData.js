const AWS = require('aws-sdk');

let options = {
  apiVersion: '2015-04-13',
  region: 'us-east-1',
  endpoint: 'https://codecommit.us-east-1.amazonaws.com',
  accessKeyId: 'AKIAQ2S4FEWF4257FMNV',
  secretAccessKey: '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',
};
var codecommit = new AWS.CodeCommit(options);

function ListAllRepositories() {
  var params = {
    order: 'ascending',
    sortBy: 'repositoryName',
  };
  codecommit.listRepositories(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
}

function GetOverviewOfRepositories() {
  var params1 = {
    repositoryNames: ['opmetrics', 'opsai'],
  };
  codecommit.batchGetRepositories(params1, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
}

function ListAllBranches() {
  var params = {
    repositoryName: 'opmetrics',
  };
  codecommit.listBranches(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });

  var params = {
    repositoryName: 'opsai',
  };
  codecommit.listBranches(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
}

function GetBranchOverview() {
  var params = {
    branchName: 'master',
    repositoryName: 'opmetrics',
  };
  codecommit.getBranch(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });

  var params = {
    branchName: 'master',
    repositoryName: 'opsai',
  };
  codecommit.getBranch(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });

  var params = {
    branchName: 'seperation-of-userpool-based-on-subdomain',
    repositoryName: 'opsai',
  };
  codecommit.getBranch(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
}

function GetCommitDetails() {
  var params = {
    commitId: 'c961b8f5079682be062ef63424b66c3f60557205',
    repositoryName: 'opsai',
  };
  codecommit.getCommit(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });

  var params = {
    commitId: '81f8f0e0baecb1317099fe6962806a9fbb3b28a1',
    repositoryName: 'opsai',
  };
  codecommit.getCommit(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });

  var params = {
    commitId: '4d14801e88103a2d5db97d99a5c39b1ed9c8366d',
    repositoryName: 'opmetrics',
  };
  codecommit.getCommit(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
}

function ListAllPullRequests() {
  var params = {
    repositoryName: 'opsai',
  };
  codecommit.listPullRequests(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });

  var params = {
    repositoryName: 'opmetrics',
  };
  codecommit.listPullRequests(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
}

function GetPullRequestDetails() {
  var params = {
    pullRequestId: '2',
  };
  codecommit.getPullRequest(params, function (err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else {
      console.log(data); // successful response
      console.log(data.pullRequest.pullRequestTargets);
    }
  });
}

//ListAllRepositories();
//GetOverviewOfRepositories();
//ListAllBranches();
//GetBranchOverview();
//GetCommitDetails();
ListAllPullRequests();
//GetPullRequestDetails();
