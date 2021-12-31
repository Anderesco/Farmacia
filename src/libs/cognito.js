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
    
    /** OBTENER LOS GRUPOS DE UN USUARIO */
    static obtenerGrupoPorUsuario = (username) => {
        return new Promise((resolve, reject) => {
            var params = {
              Username: username,
              UserPoolId: process.env.USER_POOL_ID
            };
          
            cognitoUser.adminListGroupsForUser(params
            , function(err, data) {
                  if (err) {
                      console.log("[Cognito:CognitoIdentity] obtenerGrupoPorUsuario: adminListGroupsForUser error ", err);
                      reject(err);
                      
                  }
                  else{
                      console.log("[Cognito:CognitoIdentity] obtenerGrupoPorUsuario: adminListGroupsForUser terminado ", data);
                      resolve(data);
                  }
                }
            );
        });
    }

    /** CAMBIAR LA CONTRASEÑA POR PIRMERA EN EL PRIMER LOGUEO REALIZADO */
    static cambiarContraseniaPrimeraVez = (username, password, session) => {
        return new Promise((resolve, reject) => {
            var params = {
                ChallengeName : 'NEW_PASSWORD_REQUIRED',
                Session: session,
                ChallengeResponses:{
                    USERNAME: username,
                    NEW_PASSWORD:password
                },
                ClientId: process.env.CLIENT_POOL,
            }
            
            console.log(params);
    
            cognitoUser.respondToAuthChallenge(params, function (err, data) {
                if (err) {
                    console.info("[Cognito:CognitoIdentity] cambiarContraseniaPrimeraVez : respondToAuthChallenge error ", err);
                    reject(err);
                } else {
                    console.info("[Cognito:CognitoIdentity] cambiarContraseniaPrimeraVez : respondToAuthChallenge terminado ", data);
                    resolve(data);
                }
            });
        });
    }

    /** CREA UN NUEVO USUARIO, COLOCANDO SU NOMBRE, APELLIDO Y CORREO  */
    static crearUsuario = (user, id) => {
        return new Promise((resolve, reject) => {
            var params = {
                UserPoolId: process.env.USER_POOL_ID,
                Username: user.username,
                UserAttributes:[{
                    Name: "name",
                    Value: user.nombre
                },{
                    Name: "family_name",
                    Value: user.apellidoPaterno + user.apellidoMaterno
                },{
                    Name: "email",
                    Value: user.correo
                },
                { 
                    Name: "email_verified",
                    Value: "true"
                },
                {
                    Name: "phone_number",
                    Value: user.telefono
                },
                {
                    Name: "custom:sueldo",
                    Value: user.sueldo
                },
                { 
                    Name: "custom:dni",
                    Value: user.dni
                },
                {
                    Name: "custom:id",
                    Value: id
                }
                ]
            }
            
            console.log(params);
            
            cognitoUser.adminCreateUser(params, function(err, data) {
                if (err) {
                    console.log("[Cognito:CognitoIdentity] crearUsuario : adminCreateUser error ", err); 
                    reject(err);
                }else{
                    console.log("[Cognito:CognitoIdentity] crearUsuario : adminCreateUser terminado", data); 
                    resolve(data);
                }           
            });
        });
    }


}
module.exports.CognitoIdentity = CognitoIdentity;