import fetch from 'node-fetch'
import { IServiceCheckResult } from '../types'

export default (results: IServiceCheckResult[]): Promise<any> => {
  const resultsParsed: string[] = results.map(
    ({ isOk, name }: IServiceCheckResult) => `• ${name}: ${isOk ? '*Success*' : '*Failure*'}\n`
  )

  return fetch(process.env.SLACK_WEBHOOK_URL, {
    body: JSON.stringify({
      text: `*Vazco service health check has been run*\nThese are the results:\n${resultsParsed}`
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}
