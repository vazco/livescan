const { dynamodb } = require('./dynamoDB')

const doesTableExist = async function(TableName) {
  const data = await dynamodb.listTables({}).promise()
  return data.TableNames.includes(TableName)
}

export default doesTableExist
