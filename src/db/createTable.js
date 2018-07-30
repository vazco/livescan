const { dynamodb } = require('./dynamoDB')

const createTable = async function(params) {
  const { TableName } = params

  await dynamodb.createTable(params).promise()
  return dynamodb.waitFor('tableExists', { TableName }).promise()
}

export default createTable
