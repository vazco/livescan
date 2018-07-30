const AWS = require('aws-sdk')

AWS.config.update({
  region: 'eu-west-1',
  endpoint: 'https://dynamodb.eu-west-1.amazonaws.com'
})

export const dynamodb = new AWS.DynamoDB()

export const docClient = new AWS.DynamoDB.DocumentClient()
