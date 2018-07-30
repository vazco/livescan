import * as url from 'url'

import { IService, IServiceCheckResult } from '../types'

const curl = (args: IService): Promise<IServiceCheckResult> => {
  const lib = require('request')

  return new Promise((resolve, reject) => {
    lib.get({ url: args.url, time: true }, function(err, response) {
      if (err) {
        console.log(err)
        return resolve({ ...args, duration: null, isOk: false, statusCode: null })
      }

      if (response.statusCode > 300 && response.statusCode < 400 && response.headers.location) {
        const redirect = url.parse(response.headers.location)

        // Follow redirection
        resolve(curl({ ...args, url: redirect.href }))
      } else if (response.statusCode < 200 || response.statusCode > 299) {
        // It is an error
        resolve({
          ...args,
          duration: response.timingPhases.total,
          isOk: false,
          statusCode: response.statusCode
        })
      } else {
        resolve({
          ...args,
          duration: response.timingPhases.total,
          isOk: true,
          statusCode: response.statusCode
        })
      }
    })
  })
}

export default curl
