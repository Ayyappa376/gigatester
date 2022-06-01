const AWS = require('aws-sdk')
const uuidv1 = require('uuid/v1');

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
              console.error(err);
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
              // appLogger.error(err);
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

const fetchProductList = () => {
    let params  = {
        TableName: getTableNameFor(GT_Products),
    };
    return scan(params);
}

const fetchData = (productId, productVersion, startDate, endDate, feedbackType) => {
    let params  = {
        TableName: getTableNameFor(GT_feedback),
        ExpressionAttributeNames: {
          "#createdOn": "createdOn",
          "#productId": "productId",
          "#productVersion": "productVersion",
          "#feedbackType": "feedbackType"
      },
        ExpressionAttributeValues: {':startDate': startDate , ':endDate': endDate, ':productId': productId, ':productVersion': productVersion, ':feedbackType': feedbackType},
        // ExpressionAttributeValues: {},
        FilterExpression: '#createdOn BETWEEN :startDate AND :endDate AND #productId = :productId AND #productVersion = :productVersion AND #feedbackType = :feedbackType',
        // AND :endDate',
        
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

const hh = async() => {
    const productList = await fetchProductList();
    // console.log(productList);
    productList.map(product => {
        console.log(product.version, product.id);
        if( product.feedbackAgentSettings){
            console.log(product.feedbackAgentSettings.feedbackTypes);
        }
    })
}

const processData = async() => {
    let startDate = 1639979800428;
    let endDate = 1652900423000;
    const productList = await fetchProductList();
    productList.map(product => {
        console.log(product.version, product.id);
        const productId = product.id;
        const productVersion = product.version;
        if( product.feedbackAgentSettings){
            console.log(product.feedbackAgentSettings.feedbackTypes);
            product.feedbackAgentSettings.feedbackTypes.map(async (feedbackType) => {
    const data = await fetchData (productId, productVersion, startDate, endDate, feedbackType);

    let finalCommentArray = [];
    data.forEach((el) => {
      let description = [];
      if(typeof el.feedbackComments === 'string'){
        //const newComment = convertCommentArrayToString(el.feedbackComments)
        const id = el.id;
        // update(params);
        const temp = {};
        let coms = JSON.parse(el.feedbackComments);
        for (let subComment in coms) {
            let capSubComment = subComment;
            if (Array.isArray(coms[subComment])) {
                if(coms[subComment] && coms[subComment].length > 0){
                coms[subComment].forEach((comment) => {
                    // console.log(comment);
                    if(comment){
                    if (comment.length > 0) {
                        temp[capSubComment] = comment;
                    } else {
                        // temp[capSubComment] = 'NO STANDARD COMMENTS';
                    }
                }
                })
            }
            } else {
                if (coms[subComment]) {
                    temp[capSubComment] = coms[subComment];
                } else {
                    // temp[capSubComment] = 'NO GENERAL COMMENT';
                }
            }
        }
        // console.log( temp, 'coms');
        Object.keys(temp).map((value) => {
          if(value.toUpperCase() === 'GENERALCOMMENT'){
          // description += '*GENERAL COMMENT:*\n';
          description.push(temp[value]);
          }
          else if(value.toUpperCase() === 'STANDARDFEEDBACK'){
          // description += '*STANDARDFEEDBACK:*\n';
          if(Array.isArray(temp[value])){
              temp[value].map(commentList => {
                  description.push(commentList);
              })
          }
          else{
          description.push(temp[value]);
          }
          }
          else{
          // description += '*SCREENSHOT COMMENT:*\n';
          screenshotCount = parseInt(value,10);
          screenshotCount++;
          // description+= '*'+ screenshotCount +'*\n';
              if(temp[value].message){
                  if(Array.isArray(temp[value].message)){
                      temp[value].message.map(commentList => {
                          if(commentList){
                          description.push(commentList);
                          // console.log(temp[value].message, commentList, 'non array');
                          }
                      })
                  }
                else{
                    description.push(temp[value].message);
                }
           
            }
        }
      })
    // fields[val] = "epic test\n*dssdf*\n{color:#ff5630}dfa{color}"
    let comments = '';
      if(description.length > 0){
        description.map(comment => {
          comments += comment;
          comments +=' ';
        })
      }
      else{
        comments = '';
      }
      field = {
        feedbackId: el.id,
        comment: comments,
        sentiment: ''}
      }
      finalCommentArray.push(field)
    })
    let params = {
        Item: {
            id: `comments_keywords_${uuidv1()}`,
            productId: productId,
            productVersion: productVersion,
            timePeriod: {
                startTimestamp: startDate,
                endTimestamp: endDate
            },
            feedbackType: feedbackType,
            comments: finalCommentArray,
            status: 'UNPROCESSED'         
        },
        TableName: getTableNameFor(dev_CV_Comments_Keywords)
    }
     const success = await put(params);
    })
    }
    })
    return true
}
processData()
function getTableNameFor(baseTableName) {
  if(process.env.DB_ENV === 'development') {
    return `dev_${baseTableName}`;
  }
  if(process.env.DB_ENV === 'beta') {
    return `beta_${baseTableName}`;
  }
  return `dev_${baseTableName}`;
}