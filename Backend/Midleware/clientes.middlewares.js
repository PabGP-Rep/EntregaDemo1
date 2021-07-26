const Clientedb = require("../models/clientes.modelo");

const clienteUsuarioEnviado = function (req,res,next) {
    if (!req.body.USERNAME || !req.body.PASSWORD_USUARIO){
       return res.status(400).json('Datos invalidos')
    }
    return next();
}

const checarCliente= async function (req,res,next) {
    let listaClientes = await Clientedb.findAll(
        {where: {USERNAME:req.body.USERNAME}}
    );
    if(listaClientes.length ===0){
        return res.status(400).json('No existe el usuario');
    }else if(listaClientes[0].PASSWORD_USUARIO !== req.body.PASSWORD_USUARIO){
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
    let listaClientes = await Clientedb.findAll(
        {where: {USERNAME: req.body.USERNAME}}
    );
    if(listaClientes.length > 0) {
        return res.status(400).json('Usuario ya registrado')
    }
    return next();
}


const puedeVerInfo = async function(req,res,next) {
    let listaClientes = await Clientedb.findAll(
        {where: {USERNAME: req.body.USERNAME}}
    );
    if (listaClientes[0].PAPEL !== 'ADMIN') {
        return res.status(403).json('Usuario no autorizado a ver esto')
    }
    return next();
}

module.exports = {clienteUsuarioEnviado,checarCliente, clienteExiste,clienteDatosEnviados,puedeVerInfo}