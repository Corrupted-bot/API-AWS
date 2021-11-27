const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});

var table = "Ordenes";


const oneViewOrdenes = async (_params) =>{
   let datosretornados =  await docClient.get(_params).promise();
   return datosretornados;
    
}


exports.handler = async (event) => {
    
    let data = await event.params.querystring;
    let id = parseInt(data.id)
    
        var params = {
            TableName: table,
            Key:{
                "idorden": id,
            }
        };
        let datos = await oneViewOrdenes(params);
        
        const response = {
            datos,
        };
        return response;

};
