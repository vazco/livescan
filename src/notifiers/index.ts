import email from './email'
import slack from './slack'

import { IServiceCheckResult, Notifier } from '../types'

const NOTIFIERS: Notifier[] = [email, slack]

export default (results: IServiceCheckResult[]): Promise<any> =>
  Promise.all(NOTIFIERS.map((notifier: Notifier) => notifier(results)))
