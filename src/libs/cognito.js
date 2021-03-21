const AWS = require('aws-sdk');
var cognitoUser = new AWS.CognitoIdentityServiceProvider();

class CognitoIdentity {
    
    /** LOGIN DEL USUARIO */
    static login = (username, password) =>{
        return new Promise((resolve, reject) => {
            var params = {
                ClientId: process.env.CLIENT_POOL,
                AuthFlow: 'USER_PASSWORD_AUTH',
                AuthParameters: {
                    'USERNAME': username,
                    'PASSWORD': password
                },
            }
            
            console.log("Parametros Login : " , params);
    
            cognitoUser.initiateAuth(params, function (err, data) {
                if (err) {
                    console.info("[Cognito:CognitoIdentity] login: initiateAuth error ", err);
                    reject(err);
                } else {
                    console.info("[Cognito:CognitoIdentity] login: initiateAuth terminado ", data)
                    resolve(data);
                }
            });
        });
    }
}
module.exports.CognitoIdentity = CognitoIdentity;