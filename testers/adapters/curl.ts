import {TesterAdapter, CurlTesterConfig} from 'types';

export const curl: TesterAdapter<CurlTesterConfig> = async config => {
    return {
        isOK: true,
        name: config.name,
    };
};
