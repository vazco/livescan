export enum TestType {
  CURL = 'CURL'
}

export interface IService {
  url: string,
  name: string
  type: TestType
}

export interface IServiceCheckResult extends IService {
  isOk: boolean
}

export type Adapter = (arg: IService) => Promise<IServiceCheckResult>
export type Notifier = (arg: IServiceCheckResult[]) => Promise<any>
