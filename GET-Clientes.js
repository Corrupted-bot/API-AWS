const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});

var table = "Clientes";





const oneViewClientess = async (_params) =>{
   let datosretornados =  await docClient.get(_params).promise();
   return datosretornados;
    
}


exports.handler = async (event) => {
    
    let data = await event.params.querystring;
    let id = parseInt(data.id)
    
            var params = {
            TableName: table,
            Key:{
                "idcliente": id,
            }
        };
        let datos = await oneViewClientess(params);
        
        const response = {
            datos,
        };
        return response;

};
