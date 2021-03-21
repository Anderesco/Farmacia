const {ApiError} = require('./error');
const {ApiResponse, ApiInternalErrorResponse, ApiBadRequestResponse, ApiNotFoundResponse} = require('./api-response');

const Valores =
{
    loginUserNameNotFound : new ApiNotFoundResponse(new ApiError("Ingrese el nombre de usuario", "0101")),
    loginPasswordNotFound : new ApiNotFoundResponse(new ApiError("Ingrese la contraseña", "0102")),
    loginGroupNotAcepted : new ApiBadRequestResponse(new ApiError("El usuario no existe. Comunícate con Mesa de Ayuda", "0103")),
    loginUserPassIncorrect : new ApiBadRequestResponse(new ApiError("Usuario o contraseña incorrecta", "0105")),
    loginUserPassEmpty : new ApiNotFoundResponse(new ApiError("Llene ambos los campos", "0104")),
}

exports.Valores = Valores;
