const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});

var table = "Productos";



const ViewProductos = async (_params) =>{
   let datosretornados =  await docClient.scan(_params).promise();
   return datosretornados;
    
}

const oneViewProductos = async (_params) =>{
   let datosretornados =  await docClient.get(_params).promise();
   return datosretornados;
    
}


exports.handler = async (event) => {
    
    let data = await event.params.querystring;
    let id = parseInt(data.id)
    
                var params = {
            TableName: table,
            Key:{
                "idproducto": id,
            }
        };
        let datos = await oneViewProductos(params);
        
        const response = {
            datos,
        };
        return response;