import { DynamoDB } from 'aws-sdk';

import {Config, TesterType} from '../types';
import {APIGatewayEvent, Callback, Context} from 'aws-lambda';

const doubleFunction = async () => {
    const ddb = new DynamoDB();

    const params = {
        TableName: 'Services'
    }

    const dynamoObject = await ddb.scan(params).promise()

    console.log(dynamoObject)
    return  dynamoObject.Items.map(x => DynamoDB.Converter.unmarshall(x));
};

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
                        type: TesterType.curl,
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