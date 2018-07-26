import fetch from 'node-fetch'
import { IServiceCheckResult } from '../types'

export default (results: IServiceCheckResult[]): Promise<any> => {
  const resultsParsed: string[] = results.map(
    ({ isOk, name }: IServiceCheckResult) => `• ${name}: ${isOk ? '*Success*' : '*Failure*'}\n`
  )
  return fetch('https://hooks.slack.com/services/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', {
    body: JSON.stringify({
      text: `*Vazco service health check has been run*\nThese are the results:\n${resultsParsed}`
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}
