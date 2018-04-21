import {Config} from '../types';

export const getConfig = async (): Promise<Config> => {
    return {
        services: [
            {
                name: 'Example API',
                notificators: [
                    {
                        type: 'email',
                    },
                ],
                testers: [
                    {
                        type: 'curl',
                        url: 'http://example.com',
                    },
                ],
            },
        ],
    };
};
