import {APIGatewayEvent, Callback, Context} from 'aws-lambda';

import {getConfig} from 'api';
import {notify} from 'notificators';
import {runTesters} from 'testers';
import {Config} from 'types';

export default async (event: APIGatewayEvent, context: Context, cb: Callback) => {
    try {
        // Get configuration data
        const config: Config = await getConfig();

        // Execute configured tests
        const testResults = await runTesters(config);

        // Notify about executed tests
        const notifyResults = await notify(config, testResults);

        cb(null, {
            body: JSON.stringify({
                message: 'Execution complete',
                notifyResults,
                testResults,
            }),
            statusCode: 200,
        });
    } catch (err) {
        console.error(err);
        cb(null, {
            body: JSON.stringify(err),
            statusCode: 500,
        });
    }
};
