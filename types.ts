export type Config = {
    services: ServiceConfig[];
}

export type ServiceConfig = {
    name: string;
    testers: TesterConfig[];
    notificators: NotificatorConfig[];
}

export type NotificatorConfig = {
    type: string;
}

export type TesterConfig = CurlTesterConfig;

export const enum TesterType {
    curl = 'curl',
    // ddp,
    // puppeteer,
}

type CommonTesterConfig = {
    type: TesterType;
}
export type CurlTesterConfig = CommonTesterConfig & {
    url: string;
};

export type TestResults = {
    isOK: boolean;
    services: ServiceTestResult[];
}
export type ServiceTestResult = {
    isOK: boolean;
    name: string;
    error?: TestResultError;
}
export type TestResultError = {
    message: string;
}
export type TesterAdapter<Config = CommonTesterConfig> = (Config) => Promise<ServiceTestResult>
