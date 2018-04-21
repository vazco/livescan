import {APIGatewayEvent, Callback, Context, Handler} from 'aws-lambda';

const hello: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hackathon rulez!',
            input: event,
        }),
    };

    cb(null, response);
};

export default hello;
