module.exports = {
  AttributeDefinitions: [
    { AttributeName: 'id', AttributeType: 'S' }
  ],
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  },
  TableName: 'HealthScanReports'
}
