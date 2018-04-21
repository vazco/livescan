import {Config, TestResults, ServiceTestResult} from 'types';

export const runTesters = async (config: Config): Promise<TestResults> => {
    let isOK = true;

    const services: ServiceTestResult[] = config.services.map(config => ({
        isOK: true,
        name: config.name
    }));

    return {isOK, services};
};
