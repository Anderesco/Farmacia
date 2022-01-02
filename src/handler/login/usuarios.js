const {obtenerUsuarioPorToken, validarGrupo} = require('../../require/require');
const {CognitoIdentity} = require("../../libs/cognito");
const {ApiSuccesResponse, ApiInternalErrorResponse, ApiBadRequestResponse} = require('../../response/api-response');
const { Valores } = require('../../response/mensajesError');
const {ApiError} = require('../../response/error');

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
        
        if(user.tipousuario === undefined || user.tipousuario == "")
            return Valores.createUserNotFoundRol;

        if(user.dni === undefined || user.dni.dni == "")
            return Valores.createUserNotFoundDNI;

        console.log("[CREAR USUARIO] Verificando grupo existente ", user.tipousuario);
        if(!validarGrupo(user.tipousuario))
            return Valores.createUserGroupNoExisting;

        console.log("[CREAR USUARIO] Procediendo a crear el usuario : ", user.username);
        await CognitoIdentity.crearUsuario(user);

        console.log("[CREAR USUARIO] Agregando al grupo ", user.tipousuario, 
                    " al usuario : ", user.username);
        await CognitoIdentity.agregarGrupoUsuario(user.tipousuario,user.username);

        return new ApiSuccesResponse({code : "0000" , 
                                      message : "Usuario creado, proceda a colocar una contraseña"});
        
    }
    catch(error){
        console.log("Ocurrió un error", error);

        switch(error.code){
            case "UsernameExistsException":
                return Valores.createUserUserNameExist;

            default:
                return new ApiInternalErrorResponse(new ApiError("Error inesperado: " + error));
        }
    }  
}

// ===================================================================//
/** ----------------------  OBTENER USUARIOS -------------------------*/
// ===================================================================//
exports.obtenerUsuarios = async message =>{
    try {
        console.log("[OBTENER USUARIOS] Obteniendo usuarios");
        let users = await CognitoIdentity.obtenerUsuarios();
        let listUsers = [];

        users.Users.forEach(user => listUsers.push(jsonUser(user)));

        return new ApiSuccesResponse({code : "0000" , 
                                      message : "Se obtienen los usuarios.",
                                      data: listUsers});

    } catch (error) {
        console.log("Ocurrió un error", error);

        switch(error.code){
            default:
                return new ApiInternalErrorResponse(new ApiError("Error inesperado: " + error));
        }
    }
}

function jsonUser(user) {

    return {
        username: user.Username,
        nombre : user.Attributes.filter(u => u.Name == "name")[0].Value,
        apellidos : user.Attributes.filter(u => u.Name == "family_name")[0].Value,
        telefono : user.Attributes.filter(u => u.Name == "phone_number")[0].Value,
        dni : user.Attributes.filter(u => u.Name == "custom:dni")[0].Value,
        email : user.Attributes.filter(u => u.Name == "email")[0].Value,
        estado : user.UserStatus
    }
}
