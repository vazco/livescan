import {DynamoDB} from 'aws-sdk';

import {Config} from '../types';
import {APIGatewayEvent, Callback, Context} from 'aws-lambda';
import {notify} from '../notificators';
import {runTesters} from '../testers';

 const doubleFunction = async () => {
    const params = {
        TableName : "Services",
        Item: {
            _id: {S: 'abc1'},
            name: {S: "Stare-BI"}
        }
    }
    const ddb = new DynamoDB();
    ddb.putItem(
            )

    return await ddb.putItem(params).promise()
    // const ddb = new DynamoDB().promise()
 }

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


export default async (event: APIGatewayEvent, context: Context, cb: Callback) => {
    try {

        const res = await doubleFunction();
        console.log(res)
        cb(null, {
            body: JSON.stringify({
                message: JSON.stringify(res)
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