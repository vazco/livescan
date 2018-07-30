import { APIGatewayEvent, Callback, Context } from 'aws-lambda'

import { createTableIfNoExists, saveResults } from './helpers'
import tableStructure from './db/tableStructure'

import runNotifiers from './notifiers'
import runTesters from './testers'

import { IServiceCheckResult, TestType } from './types'

interface IResponse {
  statusCode: number
  body: string
}

export default async (event: APIGatewayEvent, context: Context, cb: Callback): Promise<void> => {
  try {
    const results: IServiceCheckResult[] = await runTesters([
      { name: 'Vazco', type: TestType.CURL, url: 'http://vazco.eu/' }
    ])

    await runNotifiers(results)

    const { TableName } = tableStructure

    await createTableIfNoExists(tableStructure)

    await saveResults(results, TableName)

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
