const {CognitoIdentity} = require("../../libs/cognito");
const {DynamoUserIdentity} = require("../../libs/sql/dynamo-user");
const {ApiError} = require("../../response/error");
const {ApiSuccesResponse, ApiInternalErrorResponse} = require("../../response/api-response");
const {Valores} = require("../../response/mensajesError");
const {validacionGrupo, trimUsername} = require("../../require/require");
const {constantes} = require("../../require/constans");

// ===================================================================//
/** -----------------------------  LOGIN -----------------------------*/
// ===================================================================//
exports.token = async message =>{
    let usuarioLogueado 
    console.log(message);
    try {
        if(message.body){

            let user = JSON.parse(message.body);
            console.log("[LOGIN] Parámetros: ", user);

            /** validar si coloca un usuario */
            if(user.username === undefined || user.username == "")
                return  Valores.loginUserNameNotFound;

            /** validar si se coloca una contraseña */
            if(user.password === undefined || user.password == "")
                return Valores.loginPasswordNotFound;
            
            console.log("[LOGIN] Iniciando login...");    
            usuarioLogueado = await CognitoIdentity.login(trimUsername(user.username), user.password);

            /** valida si se encuentra en un grupo especifico */
            var grupoValidado = await validacionGrupo(trimUsername(user.username))
            console.log("[LOGIN] Usuario pertenece a un grupo : ", grupoValidado);  
            if(grupoValidado == null)
                return Valores.loginGroupNotAcepted;

            console.log("[LOGIN] Usuario autenticado correctamente!")

            /** retorna existoso el login */
            return new ApiSuccesResponse({code : "0000" , message : "Usuario logueado", group: grupoValidado, data : usuarioLogueado });

        }
        else
            return Valores.loginUserPassEmpty;

    } catch (error) {
        console.log("Error Code ", error);
        switch(error.code){
            case "NotAuthorizedException" :
                return Valores.loginUserPassIncorrect;
            
            case "UserNotFoundException":
                return Valores.loginUserPassIncorrect;
            
            case "InvalidParameterException":
                return Valores.loginUserNameNotFound;

            default :
                return new ApiInternalErrorResponse(new ApiError("Error inesperado " + error));
        }
       
    }
}

// ===================================================================//
/** ----------------------------  STATUS -----------------------------*/
// ===================================================================//
exports.statusToken = async () =>{ 
    return new ApiSuccesResponse({token : 'true'});
}

