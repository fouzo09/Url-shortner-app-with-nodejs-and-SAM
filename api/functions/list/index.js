const AWS = require('aws-sdk');

exports.handler = async function (event, context) {
    try {

        const { userSession } = event.pathParameters;

        if(!userSession) throw 'La session de l\'utilisateur est obligatoire.';

        const dynamoDb = new AWS.DynamoDB.DocumentClient();

        const params = {
            TableName: process.env.TABLE_NAME
        };
        const result = await dynamoDb.scan(params).promise();
        const data = [];
        result.Items.map((item)=>{
            if(item.userSession == userSession){
                data.push({url: item.shorted_url, userSession: item.userSession});
            }
        })
        return {
            statusCode: 200,
            body: JSON.stringify({
                count: data.length,
                items: data
            }),
            headers:{ 'Access-Control-Allow-Origin' : '*' }
        };

    } catch (error) {
        return {error}
    }
};