const AWS = require('aws-sdk');

exports.handler = async function (event, context) {
    try {
        
        const { userSession } = event.pathParameters;

        if(!userSession) throw 'La session de l\'utilisateur est obligatoire.';

        const { url, id, alias } = JSON.parse(event.body);
        const  host = event.headers.host;
        
        isValidUrl(url); 

        const dynamoDb = new AWS.DynamoDB.DocumentClient();

        const item = {
            id: id,
            userSession: userSession,
            original_url: url,
            alias: alias,
            shorted_url: `https://${host}/${alias}`
        };

        const params = {
            TableName: process.env.TABLE_NAME,
            Item: item
        };


        await dynamoDb.put(params).promise();
        
        return {
            statusCode: 200,
            body: JSON.stringify(`${item.shorted_url}`),
            headers:{ 'Access-Control-Allow-Origin' : '*' }
        };

    } catch (error) {
        return {error}
    }
};


function isValidUrl(url) {
    const pattern = new RegExp(
      '^([a-zA-Z]+:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', // fragment locator
      'i'
    );
    if(pattern.test(url)){
        return true;
    }
    throw `${url} est invalide.`;
}