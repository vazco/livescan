import { DynamoDB } from 'aws-sdk';

import { Config } from '../types';
import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { notify } from '../notificators';
import { runTesters } from '../testers';


const mockupData = {
    services: [
            {
            _id: '1',
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
    ]
}



export default async (event: APIGatewayEvent, context: Context, cb: Callback) => {
    try {

        const ddb = new DynamoDB();
        mockupData.services.forEach(async (item, index) =>  {
            const params = {
                TableName: "Services",
                Item: DynamoDB.Converter.marshall(item)
            }
            await ddb.putItem(params).promise()

        });

        cb(null, {
            body: JSON.stringify({
                // message: JSON.stringify()
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