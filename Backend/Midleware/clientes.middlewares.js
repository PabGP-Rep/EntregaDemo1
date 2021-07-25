
const clienteUsuarioEnviado = function (req,res,next) {
    if (!req.body.USERNAME || !req.body.PASSWORD_USUARIO){
       return res.status(400).json('Datos invalidos')
    }
    return next();
}

const checarCliente= async function (req,res,next) {
    let listaClientes =await listarClientes();
    let encontrado = listaClientes[0].find((element)=>{
        return element.USERNAME === req.body.USERNAME;
    })
    if (!encontrado) {
        return res.status(400).json('Usuario no encontrado');
    }else if (encontrado.PASSWORD_USUARIO !== req.body.PASSWORD_USUARIO){
        return res.status(400).json('Contraseña incorrecta')
    }
    return next();
}

const clienteDatosEnviados = function(req,res,next) {
    let DATOS = req.body;
    if (!DATOS.NOMBRE1 || !DATOS.NOMBRE2 ||!DATOS.PAPEL || !DATOS.APELLIDO1 || !DATOS.APELLIDO2 || !DATOS.USERNAME || !DATOS.DIRECCION || !DATOS.ENVIOS || !DATOS.PAIS || !DATOS.FORMA_PAGO || !DATOS.PROPIETARIO_TARJETA || !DATOS.CADUCIDAD || !DATOS.NUM_TARJETA || !DATOS.PASSWORD_USUARIO || !DATOS.CVV || !DATOS.MAIL || !DATOS.TELEFONO) {
            return res.status(400).json('Falta algún dato');
        }
    return next()
}

const clienteExiste = async function(req,res,next) {
    let listaClientes = await listarClientes();
    let encontrado = listaClientes[0].some((element) =>{
        return element.USERNAME === req.body.USERNAME;
    })
    if(encontrado) {
        return res.status(400).json('Usuario ya existe')
    }
    return next();
}


const puedeVerInfo = async function(req,res,next) {
    let listaClientes = await listarClientes();
    let encontrado = listaClientes[0].find((element) =>{
        return element.USERNAME === req.body.USERNAME 
    })
    if(encontrado.PAPEL !=='ADMIN') {
        return res.status(400).json('Usuario no autorizado para ver esto')
    }
    return next();
}
module.exports = {clienteUsuarioEnviado,checarCliente, clienteExiste,clienteDatosEnviados,puedeVerInfo}