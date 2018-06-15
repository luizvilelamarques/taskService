const dynamodb = require('./dynamodb');

module.exports.list = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
  };
  // fetch all cities from the database
  dynamodb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch cities.',
      });
      return;
    }
    // create a response
    const response = {
      statusCode: 200,
      headers: {
       "Access-Control-Allow-Credentials": true,
       "Access-Control-Allow-Origin": "*",
       "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    };
    callback(null, response);
  });
};