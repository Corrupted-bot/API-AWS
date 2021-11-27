const AWS = require("aws-sdk");

const docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});


const CreateClient = async (_params) =>{
    try {
        await docClient.put(_params).promise(); 
    } catch (err) {
        console.log(err);
        return err;
    }
    
}

exports.handler = async (event) => {
    // TODO implement
    try {
        
        let data = await event.params.querystring;
        
        
        let params = {
            TableName: "Ordenes",
            Item:{
                "idorden": parseInt(data.id),
                "valortotal": data.valortotal,
                "productos": {
                    "idproducto": data.idproducto,
                    "nombre": data.nombreproducto,
                    "precio": data.precioproducto,
                }
            }
        };

        await CreateClient(params);
        const response = {
        statusCode: 200,
        body: data,
    };
       return response;
    } catch (err) {
        const response = {
            statusCode: 400,
            body: JSON.stringify(err),
        };
        return response;
    }
    
 
};
