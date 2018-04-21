import { DynamoDB } from 'aws-sdk';

import { Config } from '../types';
import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { notify } from '../notificators';
import { runTesters } from '../testers';

const doubleFunction = async () => {
    const itemId = 'temp1';

    const params = {
        TableName: "Services",
        Item: {
            _id: { S: itemId },
            name: { S: "Stare-BI" }
        }
    }
    const ddb = new DynamoDB();
    await ddb.putItem(params).promise()

    const query = {
        TableName: 'Services'
        // ,
        // Key: {
        //     _id: {
        //         S: itemId
        //     }
        // }
    }

    return await ddb.scan(query).promise()

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
        console.log(res.Items[1])
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