const qs = require('querystring');
const graphql = require('./util/graphql');

exports.handler = async event => {
  try {
    // get the signature from the POST data
    const { name, data } = qs.parse(event.body);

    const ADD_MESSAGE = `
      mutation($name: String!, $data: String!) {
        createMessage(data: { name: $name, data: $data }) {
          _id
        }
      }
    `;

    // store the signature in the database
    await graphql(ADD_MESSAGE, { name, data });

    // send people back to the petition page
    return {
      statusCode: 302,
      headers: {
        Location: '',
      },
      // body is unused in 3xx codes, but required in all function responses
      body: 'redirecting...',
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message),
    };
  }
};
