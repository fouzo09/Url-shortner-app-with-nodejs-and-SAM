const AWS = require('aws-sdk');

exports.handler = async function (event, context) {
    try {

        const { alias } = event.pathParameters;

        if(!alias) throw 'L\'alias est obligatoire.';

        const dynamoDb = new AWS.DynamoDB.DocumentClient();

        const params = {
            TableName: process.env.TABLE_NAME
        };
        const result = await dynamoDb.scan(params).promise();
        let link = null;
        result.Items.map((item)=>{
            if(item.alias == alias){
                link = item.original_url
            }
        });

        return {
            statusCode: 301,
            headers: {
                Location: link,
            }
        };
    } catch (error) {
        return {error}
    }
};