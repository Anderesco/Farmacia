const {obtenerUsuarioPorToken} = require('../../require/require');
const {ApiSuccesResponse, ApiInternalErrorResponse} = require('../../response/api-response');

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
