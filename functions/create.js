const { nanoid } = require('nanoid');
const { dynamoDb, TABLE_NAME } = require('../dyno-client');

exports.handler = async (event, context) => {
  // make sure user is using POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 400,
      body: 'You must use an http POST for this endpoint',
      headers: { Allow: 'POST' },
    };
  }
  try {
    // parse form data
    const body = JSON.parse(event.body);

    // create item to insert
    const params = {
      TableName: TABLE_NAME,
      Item: {
        key: nanoid(7),
        text: body.text,
        createDate: new Date().toISOString(),
      },
    };

    let result = await dynamoDb.put(params).promise();

    // return success
    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: result,
      }),
    };
  } catch (error) {
    // console.log(dynamoDb);
    // console.log(TABLE_NAME);
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
