const {obtenerUsuarioPorToken} = require('../../require/require');
const {ApiSuccesResponse, ApiInternalErrorResponse} = require('../../response/api-response');
const { Valores } = require('../../response/mensajesError');

// ===================================================================//
/** ----------------  OBTENER DATOS USUARIOS SESION ------------------*/
// ===================================================================//
exports.me = async message => {
    try{
        let usuario = obtenerUsuarioPorToken(message);

        return new ApiSuccesResponse ({code : "0000" , message : "Se obtienen los datos del usuario", data: usuario});
    }
    catch(error){
        console.log("Ocurrió un error", error);
        return new ApiInternalErrorResponse(new ApiError("Error inesperado: " + error));
    }
}


// ===================================================================//
/** -------------------------  CREAR USUARIO -------------------------*/
// ===================================================================//
exports.crearUsuario = async message =>{
    let user = JSON.parse(message.body);
    
    try{
        console.log("[CREAR USUARIO] Parámetros de usuario a crear  : ", user);
        
        if(user.nombre === undefined || user.nombre == "")
            return Valores.createUserNombreNotFound;
        
        if(user.apellidoPaterno === undefined || user.apellidoPaterno == "")
            return Valores.createUserFamilyNameNotFound;
        
        if(user.apellidoMaterno === undefined || user.apellidoMaterno == "")
            return Valores.createUserFamilyNameNotFound;
        
        if(user.correo === undefined || user.correo == "")
            return Valores.createUserEmailNotFound;
        
        if(user.telefono === undefined || user.telefono == "")
            return Valores.createUserNotFoundTelefono;
        
        if(user.telefono.length != 9 || (Number(user.telefono)).length != 9)
            return Valores.createUserFormatTelefono;
        
        if(user.tipousuario === undefined || user.tipousuario == "")
            return Valores.createUserNotFoundRol;
        
        if(user.sueldo === undefined || user.sueldo == 0)
            return Valores.createUserNotFoundSueldo;
        
        if(user.dni === undefined || user.dni == 0)
            return Valores.createUserNotFoundDNI;
        
        console.log("[CREAR USUARIO] Procediendo a crear el usuario : ", user.username);
        
    }
    catch(error){
        console.log("Ocurrió un error", error);
        return new ApiInternalErrorResponse(new ApiError("Error inesperado: " + error));
    }  
}


