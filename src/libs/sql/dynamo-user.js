const AWS = require('aws-sdk');
let dynamoUser = new AWS.DynamoDB.DocumentClient();

const TablaUsuarios = process.env.TABLE_USER;
const {constantes} = require('../../require/constans')

class DynamoUserIdentity {
    /** Obtener Usuario del Dynamo */
    static getUsuario = (username, group) => {
        return new Promise((resolve, reject) =>{
            var params = {
                TableName: TablaUsuarios,
                KeyConditionExpression: 'PK = :p',
                FilterExpression : 'NombreUsuario = :q',
                ExpressionAttributeValues: {
                    ':p' : constantes.usuarios.pk + '#'+ group[0],
                    ':q' : {
                        "Rol": group,
                        "Usuario": username
                      }
                }
            }

            console.log("Parametros Dynamo : " , params);

            dynamoUser.query(params, function (err, data) {
                if (err) {
                    console.info("[Dynamo:DynamoUserIdentity] getUsuario: query error ", err);
                    reject(err);
                } else {
                    console.info("[Dynamo:DynamoUserIdentity] getUsuario: query terminado ", data)
                    resolve(data['Items'][0] != null ? data['Items'][0] : null);
                }
            });
        })
    }
}

module.exports.DynamoUserIdentity = DynamoUserIdentity;