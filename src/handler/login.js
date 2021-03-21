const {CognitoIdentity} = require("../libs/cognito")
const {ApiError} = require("../response/error");
const {ApiSuccesResponse, ApiInternalErrorResponse} = require("../response/api-response");
const {Valores} = require("../response/mensajesError");
const {validacionGrupo, trimUsername} = require("../require/require")

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

            if(user.username === undefined || user.username == "")
                return  Valores.loginUserNameNotFound;

            if(user.password === undefined || user.password == "")
                return Valores.loginPasswordNotFound;
            
            console.log("[LOGIN] Iniciando login...");    
            usuarioLogueado = await CognitoIdentity.login(trimUsername(user.username), user.password);

            /*console.log("[LOGIN] Usuario pertenece a un grupo : ", await validacionGrupo(trimUsername(user.username)));  
            if(!await validacionGrupo(trimUsername(user.username)))
                return Valores.loginGroupNotAcepted;
            
            console.log("[LOGIN] Obteniendo el grupo del usuario...");
            let group = await CognitoIdentity.obtenerGrupoPorUsuario(trimUsername(user.username));*/

            console.log("[LOGIN] Usuario autenticado correctamente!")

            return new ApiSuccesResponse({code : "0000" , message : "Usuario logueado", data : usuarioLogueado });

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
