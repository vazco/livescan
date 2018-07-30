const uuidv1 = require('uuid/v1')
import { addItem, createTable, doesTableExist } from '../db'

export const saveResults = async (results, TableName) => {
  const promises = results.map(result => {
    const { duration, errorCode, isOk, name, statusCode, type, url } = result
    const params = {
      Item: {
        date: new Date().toString(),
        duration,
        errorCode,
        id: uuidv1(),
        isOk,
        name,
        statusCode,
        type,
        url
      },
      TableName
    }
    return addItem(params)
  })

  return Promise.all(promises)
}

export const createTableIfNoExists = async (TableStructure) => {
  const { TableName } = TableStructure
  const tableExists = await doesTableExist(TableName)

  if (!tableExists) {
    return createTable(TableStructure)
  }
}
