const dynamodb = require('./dynamodb');

exports.create = async (event) => {
  const timestamp = new Date().getTime();
  try {
    const requestData = JSON.parse(event.body);
    if (typeof requestData.name !== 'string' && typeof requestData.description !== 'string') {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'text/plain' },
        body: 'json invalido',
      };
    }
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        name: requestData.name,
        description: requestData.description,
        date: timestamp,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    };
    const dynamoPromise = dynamodb.put(params).promise();
    return await dynamoPromise.then((response) => {
      if (response !== undefined) {
        return {
          statusCode: 200,
        };
      }
      return {
        statusCode: 400,
      };
    });
  } catch (e) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t parse json body',
    };
  }
};
