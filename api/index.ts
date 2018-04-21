import { DynamoDB } from 'aws-sdk';

import { Config } from '../types';
import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import { notify } from '../notificators';
import { runTesters } from '../testers';

const doubleFunction = async () => {
    const ddb = new DynamoDB();

    const params = {
        TableName: 'Services'
    }

    const dynamoObject = await ddb.scan(params).promise()

    console.log(dynamoObject)
    return  dynamoObject.Items.map(x => DynamoDB.Converter.unmarshall(x));
}

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