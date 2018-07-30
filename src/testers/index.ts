import curl from './curl'

import { Adapter, IService, IServiceCheckResult, TestType } from '../types'

type AdapterKey = TestType | 'default'

const ADAPTERS: { [k in AdapterKey]: Adapter } = {
  [TestType.CURL]: curl,
  default: async (x: IService): Promise<IServiceCheckResult> => ({
    ...x,
    duration: null,
    isOk: false,
    statusCode: null
  })
}

export default (services: IService[]): Promise<any> =>
  Promise.all(services.map((service: IService) => ADAPTERS[service.type](service)))
