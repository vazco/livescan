import * as url from 'url'

import {IService, IServiceCheckResult} from '../types'

const curl = (args: IService): Promise<IServiceCheckResult> => {
  const lib = args.url.startsWith('https') ? require('https') : require('http')

  return new Promise((resolve, reject) => {
    lib
      .get(args.url, response => {
        if (response.statusCode > 300 && response.statusCode < 400 && response.headers.location) {
          const redirect = url.parse(response.headers.location)

          // Follow redirection
          resolve(curl({ ...args, url: redirect.href }))
        } else if (response.statusCode < 200 || response.statusCode > 299) {
          // It is an error
          resolve({ ...args, isOk: false })
        } else {
          resolve({ ...args, isOk: true })
        }
      })
       .on('error', () => resolve({ ...args, isOk: false }))
  })
}

export default curl
