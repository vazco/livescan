// import { DynamoDB, EC2 } from 'aws-sdk';
// import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
// // import AWS from 'aws-sdk';

// // Set the region





// const tempKacper: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
//     const params = {
//         TableName : "Projects",
//         KeySchema: [
//             {
//                 AttributeName: "_id",
//                 KeyType: "HASH", //Partition key
//             },
//         ],
//         AttributeDefinitions: [
//             {
//                 AttributeName: "Artist",
//                 AttributeType: "S"
//             },
//             {
//                 AttributeName: "SongTitle",
//                 AttributeType: "S"
//             }
//         ],
//         ProvisionedThroughput: {
//             ReadCapacityUnits: 1,
//             WriteCapacityUnits: 1
//         }
//     }
//     const request = new DynamoDB();

//     const ddb = new DynamoDB().promise()
//     const tep = new EC2({apiVersion: '2014-10-01'}).promise()


//     console.log('DUPA')
//     const response = {
//         statusCode: 200,
//         body: JSON.stringify({
//             message: 'Kacper\'s msg',
//             input: event,
//         }),
//     };

//     cb(null, response);
// };


// export default tempKacper;
