import React from 'react';
import ReactDOM from 'react-dom';
import { Buffer } from 'buffer';
var AWS = require("aws-sdk");


const config = {
  bucketName: 'emptotbucket',
  region: 'us-east-1',
  accessKeyId: 'AKIA3HR7UMMSYYTC36X3',
  secretAccessKey: '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',
};
global.Buffer = Buffer;

AWS.config.update({ region: config.region, accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey });
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

const FileUploader = () => {
  s3.listBuckets(function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Buckets);
    }
  });
}
export default FileUploader;