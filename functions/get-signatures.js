const graphql = require('./util/graphql');

exports.handler = async () => {
  const { messages } = await graphql(`
    query {
      messages {
        data {
          name,
          data
        }
      }
    }
  `);
  return {
    statusCode: 200,
    body: JSON.stringify({messages}),
  };
};
