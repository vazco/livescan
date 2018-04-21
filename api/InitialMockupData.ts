import { DynamoDB } from 'aws-sdk';

import { Config } from '../types';
import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { notify } from '../notificators';
import { runTesters } from '../testers';


const mockupData = {
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
    ]
}



export default async (event: APIGatewayEvent, context: Context, cb: Callback) => {
    try {

        console.log(DynamoDB.Converter.marshall(mockupData))

        // mockupData.services.forEach(item => {

        //     const params = {
        //         TableName: "Services",
        //         Item: {
        //             _id: { S: 'sdgf' },
        //             name: { S: "Stare-BI" }
        //         }
        //     }
        //     const ddb = new DynamoDB();
        //     await ddb.putItem(params).promise()

        // });
        // const res = await doubleFunction();

        // console.log(res.Items[1])
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