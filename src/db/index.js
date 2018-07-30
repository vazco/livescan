const { docClient } = require('./dynamoDB')
const { dynamodb } = require('./dynamoDB')

export const addItem = Item => docClient.put(Item).promise()

export const createTable = async (params) => {
  const { TableName } = params

  await dynamodb.createTable(params).promise()
  return dynamodb.waitFor('tableExists', { TableName }).promise()
}

export const doesTableExist = async (TableName) => {
  const data = await dynamodb.listTables({}).promise()
  return data.TableNames.includes(TableName)
}
