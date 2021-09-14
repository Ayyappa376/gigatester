import { httpRequest } from './httpRequest';

//  https://p-sentinel-prime.aws.imovetv.com/jira/team-mapping

startSync();

function startSync() {
  const url = `https://p-sentinel-prime.aws.imovetv.com/jira/team-mapping`;

  httpRequest('GET', url, undefined, undefined)
  .then((res: any) => {
    console.log({url, response: {statusCode: res.statusCode, headers: res.headers}});
    if(res.statusCode < 200 || res.statusCode >= 300) {
      const err: Error = new Error(`Error: Received response ${res.statusCode} from ${url}`);
      console.log({err});
    } else {
      try {
        //if build details received, then store it
        console.log(prettyPrint(res.body));
        const teamMappings: any[] = JSON.parse(res.body);
        teamMappings.forEach((team: any) => {
          //get the team with the same name from dynamoDB
          //if(exists)
            //add the service components to it
            //update the existing team on dynamoDB with new data
          //else
            //create a new team with service components, team name, defaults for other mandatory info
            //create the new team on dynamoDB
        });
      } catch (err) {
        console.log({err}, 'Error while parsing response');
      }
    }
  })
  .catch((err: any) => {
    console.log({err}, 'Error while sending request');
  });
}

function prettyPrint(jsonString: string) {
  return JSON.stringify(JSON.parse(jsonString), undefined, 2);
}
