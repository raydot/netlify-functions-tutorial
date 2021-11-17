const AWS = require('aws-sdk');
require('dotenv').config();

const { MY_AWS_ACCESS_KEY_ID, MY_AWS_SECRET_ACCESS_KEY, MY_AWS_REGION } =
  process.env;

const TABLE_NAME = 'key';

AWS.config.update({
  credentials: {
    accessKeyId: MY_AWS_ACCESS_KEY_ID,
    secretAccessKey: MY_AWS_SECRET_ACCESS_KEY,
  },
  region: MY_AWS_REGION,
});

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = { dynamoDb, TABLE_NAME };
