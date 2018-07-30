import { APIGatewayEvent, Callback, Context } from 'aws-lambda'

const uuidv1 = require('uuid/v1')

import addItem from './db/addItem.js'
import createTable from './db/createTable.js'
import doesTableExist from './db/checkIfTableExists.js'
import healthScanReportsTable from './db/HealthScanReportsTableStructure'

import runNotifiers from './notifiers'
import runTesters from './testers'

import { IServiceCheckResult, TestType } from './types'

interface IResponse {
  statusCode: number
  body: string
}

// tslint:disable:no-console
export default async (event: APIGatewayEvent, context: Context, cb: Callback): Promise<void> => {
  try {
    const { TableName } = healthScanReportsTable
    const tableExists: boolean = await doesTableExist(TableName)
    if (!tableExists) {
      try {
        await createTable(healthScanReportsTable)
        console.log(`Table ${TableName} created`)
      } catch (err) {
        console.log(err)
      }
    }

    const results: IServiceCheckResult[] = await runTesters([
      { name: 'Vazco', type: TestType.CURL, url: 'http://vazco.eu/' }
    ])

    await runNotifiers(results)

    for (const result of results) {
      const { isOk, name, statusCode, type, url } = result
      const params = {
        Item: {
          date: new Date().toString(),
          duration: result.duration,
          id: uuidv1(),
          isOk,
          name,
          statusCode,
          type,
          url
        },
        TableName
      }
      try {
        await addItem(params)
      } catch (err) {
        console.log(err)
      }
    }

    const response: IResponse = {
      body: JSON.stringify({
        message: 'It is fine!',
        results
      }),
      statusCode: 200
    }

    cb(null, response)
  } catch (_) {
    // pass
  }
}
