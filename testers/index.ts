import {Config, TesterConfig, TestResults, ServiceTestResult} from 'types';

import adapters from './adapters';

export const runTesters = async (config: Config): Promise<TestResults> => {
    const results = config.services.map((serviceConfig): Promise<ServiceTestResult> => Promise.all(
        serviceConfig.testers.map((testerConfig: TesterConfig) => adapters[testerConfig.type](config))
    ).then(results =>
        results.reduce((result, curr) => Object.assign(result, {isOK: result.isOK && curr.isOK}), {isOK: true, name: serviceConfig.name})
    ));

    return {
        isOK: true,
        services: await Promise.all(results)
    };
};
