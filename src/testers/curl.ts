const request = require('request')

import { IService, IServiceCheckResult } from '../types'

const curl = (args: IService): Promise<IServiceCheckResult> => {
  return new Promise((resolve, reject) => {
    request.get({ url: args.url, time: true }, (err, response) => {
      if (err) {
        return resolve({ ...args, duration: null, errorCode: err.code, isOk: false, statusCode: null })
      }
      resolve({
        ...args,
        duration: response.timingPhases.total,
        errorCode: null,
        isOk: true,
        statusCode: response.statusCode
      })
    })
  })
}

export default curl
