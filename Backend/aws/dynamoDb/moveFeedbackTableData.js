const AWS = require('aws-sdk')

const region =  'us-east-1'
const dbConfig = {
    apiVersion: '2012-08-10',
    region: region,
};

const docClient = new AWS.DynamoDB.DocumentClient(
    dbConfig
);

function update(params) {
  return new Promise(
    (resolve, reject) => {
      docClient.update(
        params,
        (err, data) => {
          if (err) {
            console.error(err);
            return reject(err);
          }

          return resolve(data.Attributes);
        }
      );
    }
  );
}

function put(params) {
  return new Promise(
    (resolve, reject) => {
      docClient.put(
        params,
        (err, data) => {
          if (err) {
            return reject(err);
          }
          return resolve(data.Attributes);
        }
      );
    }
  );
}

function scan(params) {
    return new Promise(
      (resolve, reject) => {
        docClient.scan(
          params,
          async (err, data) => {
            if (err) {
              appLogger.error(err);
              return reject(err);
            }
            let result = data.Items;
            if (data.LastEvaluatedKey) {
              const newParams = params;
              newParams.ExclusiveStartKey = data.LastEvaluatedKey;
              const res = await scan(newParams);
              result = result.concat(res);
              return resolve(result);
            }
            return resolve(result);
          }
        );
      }
    );
}


const fetchData = () => {
    let params  = {
        TableName: 'dev_GT_feedback',
    };
    return scan(params);
}

const convertCommentArrayToString = (commentArray) => {
   let commentsObject = {}
   commentArray.forEach((el, i) => {
     commentsObject[`${i}`] = {
      "screenshot_num": 0,
      "screen_y": 0,
      "screen_x": 0,
      "message": el,
      "screen_number": i
     }
   })

   return JSON.stringify(commentsObject);
}

const processData = async() => {
    const data = await fetchData();
   // console.log(data)

    data.forEach((el, i) => {
     // if(typeof el.feedbackComments === 'object'){
        //const newComment = convertCommentArrayToString(el.feedbackComments)
        const params = {
          Item: el,
          TableName: 'dev_GT_feedback2',
        };
        //if(i === 0) {
          console.log("hey", i)
          put(params);
        //}
      }
    )

    
  
    //return update(params);
}

processData()