const AWS = require('aws-sdk');
const axios = require('axios');
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const cron = require('node-cron');

const scheduler = async (event, context) => {
console.log('inside handler function');
const region =  'us-east-1'
const dbConfig = {
    apiVersion: '2012-08-10',
    region: region,
};

const s3Config = {
  apiVersion: '2006-03-01',
  region: region,
};

const s3 = new AWS.S3(s3Config);

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

function deleteItem(params) {
  return new Promise(
    (resolve, reject) => {
      docClient.delete(
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
              return reject(err);
            }
            let result = data.Items;
            return resolve(result);
          }
        );
      }
    );
}

const updatetableStatus = (status, item) => {
    const params = {
        Key: {
            id: item.id,
            createdOn: item.createdOn
        },
        UpdateExpression: "set #status = :y",
        ExpressionAttributeNames: {
            "#status": 'status'
        },
        ExpressionAttributeValues: {
            ":y": status
        },
        TableName: getTableNameFor('GT_ExtIssueUpload'),
    };
    update(params);
}

const removeFileUploadEntry = async(item) => {
  console.log(item, 'remove Item');
const params = {
  Key: {
    id: item.id,
    createdOn: item.createdOn
  },
  TableName: getTableNameFor('GT_ExtIssueUpload'),
};
 return await deleteItem(params);

}

 const getfileStream = async(mediaBucketName, mediaName, extTrackingSystem, item, jiraAttachmentUrl) => {
  const trackingSystemDetails = extTrackingSystem.trackingSystem;
  const newfileStream = fs.createWriteStream(mediaName);
  console.log(trackingSystemDetails);
  let params = {
    Bucket: mediaBucketName, 
    Key: mediaName
  }
  let fileStream = s3.getObject(params).createReadStream()
  fileStream.pipe(newfileStream).on('finish',async function() {
    console.log('completed file write')
    const postMediaToJira = await postJIRAUploadMediaIncident(
      {
        appToken: trackingSystemDetails.auth.authKey,
        email: trackingSystemDetails.auth.authUser,
      }, 
      item,
      mediaName,
      jiraAttachmentUrl,
      extTrackingSystem
    )
  return true;
})
 }

const fetchData = () => {
    let params  = {
        TableName: 'dev_GT_ExtIssueUpload',
    };
    return scan(params);
}

async function postJIRAUploadMediaIncident(
  auth,
  item,
  fileName,
  jiraAttachmentUrl,
  extTrackingSystem
) {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    const fileStream = fs.createReadStream(fileName);
  
    form.append('file', fileStream);
const token = `${auth.email}:${auth.appToken}`;
const encodedToken = Buffer.from(token).toString('base64');
fetch(`${jiraAttachmentUrl}/attachments`, {
    method: 'POST',
    body: form,
    headers: {
      'Authorization': 'Basic '+ `${encodedToken}`,
      'Accept': 'application/json',
      'X-Atlassian-Token': 'no-check'
    }
})
    .then(response => {
        console.log(
            `Response: ${response.status} ${response.statusText}`
        );
        return response.text();
    })
    .then(text => {
      console.log(text);
      fs.unlink(fileName, function (err) {
        if (err) throw err;
        // if no error, file has been deleted successfully
        console.log('File deleted!');
    });
      removeFileUploadEntry(extTrackingSystem);
    
    })
    .catch(err => console.error(err));
// console.log(encodedToken);
  });
}


const getproductTrackingSystemDetails = async (productId, productVersion) => {
  // console.log(productId, productVersion, 'prodId&Version')
  const params = {
      ExpressionAttributeNames: {'#id': 'id', '#version': 'version'},
      ExpressionAttributeValues: {':id': productId, ':version': productVersion},
      FilterExpression: '#id = :id AND #version = :version',
      TableName: getTableNameFor('GT_Products'),
  };
  // console.log('feedback-api-db-handler: DynamoDBScan params:', params);
  try{
  const result = await scan(params);
  console.log('feedback-api-db-handler: DynamoDBScan result:', result);
  return (result.Items.length > 0) ? result.Items[0].trackingSystem : '';
  }
  catch(error){
      console.log(error);
  }
}

const getFeedbackData = async(id) => {
    console.log(id, 'feedback Id');
    const params = {
        ExpressionAttributeNames: {'#id': 'id'},
        ExpressionAttributeValues: {':id': id},
        FilterExpression: '#id = :id',
        TableName: getTableNameFor('GT_feedback'),
    }
    try{
    const result = await scan(params);
    console.log(result, 'feedback table data');
    return (result.length > 0) ? result[0] : '';
    }
    catch(error){
        console.log(error, 'feedback db error');
        return;
    }

} 

const postJIRAIncident = async(
  auth,
  item,
  extTrackingSystem,
) => {
  return new Promise((resolve, reject) => {
      console.log(item, 'postJIRAitems');
const trackingSystemDetails = extTrackingSystem.trackingSystem;
const mappingfields = trackingSystemDetails.fieldMappings;
console.log(trackingSystemDetails, 'trackingSystemDetails');
console.log(mappingfields, 'mappingfields');
const fields = {
    // description: item.feedbackComments,
    issuetype: {
      name: 'Bug'
    },
    project: {
      key: 'GTI'
    },
}
Object.keys(mappingfields).map((value) => {
    let val = mappingfields[value].toLowerCase();
    let description = ''
    if(value === 'CATEGORIES'){
    console.log(val, 'val');
    // fields[val] = "epic test\n*dssdf*\n{color:#ff5630}dfa{color}"
    fields[val] = item.feedbackCategory;
    }
    if(value === 'SEVERITIES'){
        let priorityVal = item.bugPriority.toUpperCase().slice(0,1) + item.bugPriority.toLowerCase().slice(1,)
        console.log(priorityVal);
        fields[val] = {
        name: priorityVal
    }
    }
    if(value === 'COMMENTS'){
        console.log(val, 'val');
        const temp = {};
            let coms = JSON.parse(item.feedbackComments);
            for (let subComment in coms) {
                let capSubComment = subComment;
                if (Array.isArray(coms[subComment])) {
                    coms[subComment].forEach((comment) => {
                        if (comment.length > 0) {
                            temp[capSubComment] = comment;
                        } else {
                            temp[capSubComment] = 'NO STANDARD COMMENTS';
                        }
                    })
                } else {
                    if (coms[subComment]) {
                        temp[capSubComment] = coms[subComment];
                    } else {
                        temp[capSubComment] = 'NO GENERAL COMMENT';
                    }
                }
            }
        console.log( temp, 'coms');
        Object.keys(temp).map((value) => {
            if(value.toUpperCase() === 'GENERALCOMMENT'){
            description += '*GENERAL COMMENT:*\n';
            description+= temp[value] + '\n';
            }
            else if(value.toUpperCase() === 'STANDARDFEEDBACK'){
            description += '*STANDARDFEEDBACK:*\n';
            if(Array.isArray(temp[value])){
                temp[value].map(commentList => {
                    description += commentList + '\n';
                })
            }
            else{
            description+= temp[value] + '\n';
            }
            }
            else{
            description += '*SCREENSHOT COMMENT:*\n';
            screenshotCount = parseInt(value,10);
            screenshotCount++;
            description+= '*'+ screenshotCount +'*\n';
            Object.keys(temp[value]).map((subKeys) => {
                description += subKeys+' : '
                description += temp[value][subKeys] + '\n';
            })
            }
        })
        // fields[val] = "epic test\n*dssdf*\n{color:#ff5630}dfa{color}"
        fields[val] = description;
        }
})

console.log(fields, 'fields');
const data = JSON.stringify({
    fields});
console.log(data);
const token = `${auth.email}:${auth.appToken}`;
const encodedToken = Buffer.from(token).toString('base64');
console.log(encodedToken, 'encodedToken');
console.log(trackingSystemDetails, 'extDetails');
console.log(trackingSystemDetails.url, 'extUrl');
const config = {
  data,
  headers: {
    'Authorization': 'Basic '+ `${encodedToken}`,
    'Content-Type': 'application/json',
  },
  method: 'post',
  url: `${trackingSystemDetails.url}rest/api/latest/issue`,
};
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data), 'response');
  if(item.feedbackMedia.image){
    let mediaBucketName = item.feedbackMedia.image.split(".")[0].slice(8,)
    console.log(mediaBucketName)
    let mediaName = item.feedbackMedia.image.split("/")[3]
    console.log(mediaName)
    getfileStream(mediaBucketName, mediaName, extTrackingSystem, item, response.data.self);
  }
  else if(item.feedbackMedia.audio){
    let mediaBucketName = item.feedbackMedia.audio.split(".")[0].slice(8,)
    console.log(mediaBucketName)
    let mediaName = item.feedbackMedia.audio.split("/")[3]
    console.log(mediaName)
    getfileStream(mediaBucketName, mediaName, extTrackingSystem, item, response.data.self);
  }
  else if(item.feedbackMedia.file){
    let mediaBucketName = item.feedbackMedia.file.split(".")[0].slice(8,)
    console.log(mediaBucketName)
    let mediaName = item.feedbackMedia.file.split("/")[3]
    console.log(mediaName)
    getfileStream(mediaBucketName, mediaName, extTrackingSystem, item, response.data.self);
  }
  else if(item.feedbackMedia.video){
    let mediaBucketName = item.feedbackMedia.video.split(".")[0].slice(8,)
    console.log(mediaBucketName)
    let mediaName = item.feedbackMedia.video.split("/")[3]
    console.log(mediaName)
    getfileStream(mediaBucketName, mediaName, extTrackingSystem, item, response.data.self);
  }
  else{
    removeFileUploadEntry(extTrackingSystem);
    resolve(JSON.stringify(response.data));
  }
})
.catch(function (error) {
  console.log(error, 'axios error');
  updatetableStatus('error', extTrackingSystem);
  reject(error);
});
  });
}


function getTableNameFor(baseTableName) {
  if(process.env.DB_ENV === 'development') {
    return `dev_${baseTableName}`;
  }
  if(process.env.DB_ENV === 'beta') {
    return `beta_${baseTableName}`;
  }
  return `dev_${baseTableName}`;
}

const processData = async() => {
    const data = await fetchData();
   console.log(data);
    let postJIRA;
    try{
    data.forEach( async (item, i) => {
      const trackingSystemDetails = item.trackingSystem;
      const el = await getFeedbackData(item.feedbackId);
      console.log(el, 'el');
      if(el){
        try{
         postJIRA = await postJIRAIncident(
          {
           appToken: trackingSystemDetails.auth.authKey,
           email: trackingSystemDetails.auth.authUser,
         },
         el,
         item
         );
        }
        catch(error){
          console.log(error);
        }
        }
       else{
            console.log(' feedback Data is not found in feedback table');
        }
      } 
    )
    }
    catch(error){
      console.log(error);
    }
    //return update(params);
}
try{
const result = await processData();
if(result){
  console.log(result);
  }
}
catch(error){
  console.log(error)
}

}
cron.schedule('* * * * *', function() {
    console.log('scheduler triggered');
    scheduler('a','b');

})
// scheduler('a','b');
