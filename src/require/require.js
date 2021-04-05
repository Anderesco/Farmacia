const {CognitoIdentity} = require("../libs/cognito")
const {constantes} = require("../require/constans");

/** quitando los espacios en blanco al momento de validacion */
function trimUsername(username){
    return username.trim();
}

/** Valida si el usuario pertenece a un grupo  */
async function validacionGrupo (username) {
    
    /** obtiene el grupo del usuario */
    var valor = await CognitoIdentity.obtenerGrupoPorUsuario(username).then(async data => {
        /** variable para guardar el nombre del grupo */
        var grupoUno = null;

        /** no hay grupo relacionado al usuario */
        if(data['Groups'].length == 0)
            return null;
        
        /** recorre los grupos que presenta el usuario */    
        data['Groups'].forEach(grupo => {
            if(constantes.grupos.includes(grupo.GroupName))
                grupoUno = grupo.GroupName;
        });

        return grupoUno;
    });

    console.log("Grupos totales del usuario ", username , " son : ", valor);

    return valor;
}


/** Obtener datos desde un token */
function obtenerUsuarioPorToken(message){
    var authHeader = message.headers['Authorization'];

    let usuario = (authHeader.split(' ')[1].toString()).split('.')[1];
    console.log("[TOKEN] Token: ", authHeader);

    const buff = Buffer.from(usuario, 'base64');
    const str = buff.toString('utf-8');

    console.log("[JSON] Usuario: ", str);
    let atributosUsuario = JSON.parse(str)

    return attributosusuarioToken(atributosUsuario);
}

function attributosusuarioToken(atributosUsuario){
    return {
        id : parseInt(atributosUsuario['custom:id']),
        dni : atributosUsuario['custom:dni'],
        nombres : atributosUsuario.name,
        apellidos : atributosUsuario.family_name,
        correo : atributosUsuario.email,
        telefono : atributosUsuario.phone_number,
        sueldo : Number(atributosUsuario['custom:sueldo']),
        rol : atributosUsuario['cognito:groups'][0],
        username : atributosUsuario['cognito:username']
    }
}


module.exports.trimUsername = trimUsername;
module.exports.validacionGrupo = validacionGrupo;
module.exports.obtenerUsuarioPorToken = obtenerUsuarioPorToken;