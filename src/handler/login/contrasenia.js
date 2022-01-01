const {CognitoIdentity} = require("../../libs/cognito")
const {ApiError} = require("../../response/error");
const {ApiSuccesResponse, ApiInternalErrorResponse,ApiBadRequestResponse} = require("../../response/api-response");
const {Valores} = require("../../response/mensajesError");
const {validacionGrupo, validacionUsuariosTotales, obtenerEmail, validarEstado,trimUsername} = require("../../require/require")



// ===================================================================//
/** -------------------  CAMBIO CONTRASEÑA 1° VEZ --------------------*/
// ===================================================================//
exports.cambiarContraseniaPrimeraVez = async message => {
    try{
        let tokenTemp;
        if(message.body){
            let user = JSON.parse(message.body);
            console.log("[CAMBIAR CONTRASENIA] Parametros obtenidos : ", user);

            /** validacion si coloca la sesion */
            if(user.session === undefined || user.session == "")
                return Valores.changePasswordSessionNotFound;

            /** validacion si coloca el nombre de usuario */
            if(user.username === undefined || user.username == "")
                return Valores.changePasswordUserNameNotFound;

            /** validacion si coloca la nueva contraseña */
            if(user.password != user.repassword)
                return Valores.changePasswordPassDifferent;
            
            /** validacion si coloca la confirmacion de contraseña */
            if(user.password == "" || user.repassword == "")
                return Valores.changePasswordPassNull;

            console.log("[CAMBIAR CONTRASENIA] Cambiando contrasenia");
            tokenTemp = await CognitoIdentity.cambiarContraseniaPrimeraVez(trimUsername(user.username), user.password, user.session);
            console.log("[CAMBIAR CONTRASENIA] Se cambio la contrasenia correctamente ", tokenTemp);

            return new ApiSuccesResponse ({code : "0000" , message : "Se realizó correctamente el cambio de contraseña", data : tokenTemp});

        }
    } catch (error) {
        console.log("[ERROR] ", error);
        switch(error.code){
            case "NotAuthorizedException" :
                return Valores.changePasswordSessionExpired;

            case "InvalidPasswordException":
                return Valores.changePasswordPassNoChange;

            case "InvalidParameterException":
                return Valores.changePasswordInvalidParameters;

            default :
                return new ApiInternalErrorResponse(new ApiError("Ocurrió un error: " + error));
        }
    }
}

// ===================================================================//
/** --------------------  CAMBIAR CONTRASEÑA ADMIN -------------------*/
// ===================================================================//
exports.cambiarContraseniaAdmin = async message => {
    let user = JSON.parse(message.body);

    try {
        console.log("[Cambiar/Colocar Contraseña] Actualizando usuario ", user.username);
        await CognitoIdentity.colocarActualizarContraseña(user.password,user.username);

        return new ApiSuccesResponse({code : "0000" , 
                                      message : "Usuario modificado, contraseña establecida"});
    }
    catch(error) {
        console.log("Ocurrió un error", error);
        switch(error.code){
            default:
                return new ApiInternalErrorResponse(new ApiError("Error inesperado: " + error));
        }
    }
}