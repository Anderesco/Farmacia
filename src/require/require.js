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


module.exports.trimUsername = trimUsername;
module.exports.validacionGrupo = validacionGrupo;