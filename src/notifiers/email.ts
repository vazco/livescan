import * as AWS from 'aws-sdk'
import _merge from 'lodash.merge'

import {IServiceCheckResult} from '../types'

const AWS_SES: AWS.SES = new AWS.SES()

const defaultParams: AWS.SES.SendEmailRequest = {
  Destination: {
    ToAddresses: [
      'developer@vazco.eu'
    ]
  },
  Message: {
    Body: {
      Html: {
        Charset: 'UTF-8',
        Data: ''
      }
    },
    Subject: {
      Charset: 'UTF-8',
      Data: 'Health scan report'
    }
  },
  Source: 'no-reply@vazco.eu'
}

export default (results: IServiceCheckResult[]): Promise<any> => {
  const params: AWS.SES.SendEmailRequest = _merge(defaultParams, {
    Message: {
      Body: {
        Html: {
          Data: `
          <h1>Vazco service health check has been run.</h1>
          <p>These are the results:</p>
          <ul>${results.map(({ isOk, name }: IServiceCheckResult) =>
            `<li>${name}: <b>${isOk ? 'Success' : 'Failure'}</b></li>`
          )}</ul>
          `
        }
      }
    }
  })

  return AWS_SES.sendEmail(params).promise()
}
