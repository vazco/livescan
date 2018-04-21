export interface Config {
    services: ServiceConfig[];
}

export interface ServiceConfig {
    name: string;
    testers: TesterConfig[];
    notificators: NotificatorConfig[];
}

export interface TesterConfig {
    type: string;
    url: string;
}
export interface NotificatorConfig {
    type: string;
}

export type TestResults = {
    isOK: boolean;
}
