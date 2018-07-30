const { docClient } = require('./dynamoDB')

const addItem = Item => {
  return docClient.put(Item).promise()
}

export default addItem
