const {ApiError} = require('./error');
const {ApiResponse, ApiInternalErrorResponse, ApiBadRequestResponse, ApiNotFoundResponse} = require('./api-response');

const Valores =
{
    loginUserNameNotFound : new ApiNotFoundResponse(new ApiError("Ingrese el nombre de usuario", "0101")),
    loginPasswordNotFound : new ApiNotFoundResponse(new ApiError("Ingrese la contraseña", "0102")),
    loginGroupNotAcepted : new ApiBadRequestResponse(new ApiError("El usuario no pertenece a un grupo", "0103")),
    loginUserPassIncorrect : new ApiBadRequestResponse(new ApiError("Usuario o contraseña incorrecta", "0105")),
    loginUserPassEmpty : new ApiNotFoundResponse(new ApiError("Llene ambos los campos", "0104")),

    createUserNameNotFound : new ApiNotFoundResponse(new ApiError("Ingrese el usuario", "0201")),
    createUserNombreNotFound : new ApiNotFoundResponse(new ApiError("Ingrese su nombre", "0202")),
    createUserFamilyNameNotFound : new ApiNotFoundResponse(new ApiError("Ingrese sus apellidos", "0203")),
    createUserEmailNotFound : new ApiNotFoundResponse(new ApiError("Ingrese su correo", "0204")),
    createUserEmailParameterInvalid : new ApiBadRequestResponse(new ApiError("Correo no presenta el formato", "0205")),
    createUserUserGroupExist : new ApiBadRequestResponse( new ApiError("El usuario ya existe en un grupo", "0206")),
    createUserGroupNoExisting : new ApiBadRequestResponse(new ApiError("El grupo que desea asignar no existe", "0207")),
    createUserUserNameExist : new ApiBadRequestResponse(new ApiError("El usuario ya existe", "0208")),
    createUserNotFoundTelefono : new ApiNotFoundResponse(new ApiError("Ingrese un número telefónico", "0209")),
    createUserFormatTelefono : new ApiBadRequestResponse(new ApiError("Número de celular debe presentar un número de 9 dígitos", "0210")), 
    createUserNotFoundRol : new ApiNotFoundResponse(new ApiError("Seleccione el rol del usuario", "0211")),
    createUserNotFoundSueldo : new ApiNotFoundResponse(new ApiError("Ingrese un sueldo", "0212")),
    createUserNotFoundDNI : new ApiNotFoundResponse(new ApiError("Ingrese un DNI", "0213")),

    changePasswordSessionNotFound : new ApiNotFoundResponse(new ApiError("No se encontró la sesión del usuario", "0401")),
    changePasswordUserNameNotFound : new ApiNotFoundResponse(new ApiError("Colocar el usuario", "0402")),
    changePasswordPassDifferent : new ApiBadRequestResponse(new ApiError("Contraseñas deben de ser iguales", "0403")),
    changePasswordPassNull : new ApiNotFoundResponse(new ApiError("Colocar contraseñas", "0404")),
    changePasswordPassNoChange :new ApiBadRequestResponse(new ApiError(["Contraseña debe tener al menos 1 mayúscula", "Contraseña debe tener al menos 1 número", "Contraseña debe tener al menos 1 caracter especial"], "0405")),
    changePasswordSessionExpired : new ApiBadRequestResponse(new ApiError("Sesión expirada","0406")),
    changePasswordInvalidParameters : new ApiNotFoundResponse (new ApiError("Usuario no puede realizar esta operación - atributos no encontrados (nombre, apellido, correo)", "0407")),

}

exports.Valores = Valores;
