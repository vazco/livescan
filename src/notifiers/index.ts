import email from './email'

import { IServiceCheckResult, Notifier } from '../types'

const NOTIFIERS: Notifier[] = [email]

export default (results: IServiceCheckResult[]): Promise<any> =>
  Promise.all(NOTIFIERS.map((notifier: Notifier) => notifier(results)))
