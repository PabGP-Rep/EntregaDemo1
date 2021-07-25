

const sequelize = require("../db/conexion");
const Clientedb = require("../models/clientes.modelo")



const listarClientes= async (usuario) =>{
    try {
        let listaClientes = await Clientedb.findAll()
        return listaClientes;
    } catch (error) {
        throw new Error('Error al mostrar los usuarios',error);
    }
}

const buscarCliente = async (usuario) =>{
    try {
        let encontrado = await Clientedb.findAll({
            where: {
                USERNAME: usuario.USERNAME
            }
        })
        return encontrado
    } catch (error) {
        throw new Error(error);
    }
}

const eliminarCliente = async (usuario) =>{
    try {
        await Clientedb.destroy({
            where:{
                USERNAME: usuario.USERNAME
            }
        })
        sequelize.query(`INSERT INTO CLIENTES_DADOS_BAJA(USERNAME) VALUES (${usuario.USERNAME})`)
    } catch (error) {
        throw new Error('Error al eliminar cliente',error.message);
    }
}


const actualizarCliente = async (usuario) =>{
    try {
        await Clientedb.update({NOMBRE1: usuario.NOMBRE1,NOMBRE2:usuario.NOMBRE2,PAPEL: usuario.PAPEL,APELLIDO1:usuario.APELLIDO1,
        APELLIDO2: usuario.APELLIDO2,DIRECCION:usuario.DIRECCION,ENVIOS:usuario.ENVIOS, PAIS: usuario.PAIS, FORMA_PAGO:usuario.FORMA_PAGO,
        PROPIETARIO_TARJETA:usuario.PROPIETARIO_TARJETA, NUM_TARJETA: usuario.NUM_TARJETA, CADUCIDAD:usuario.CADUCIDAD, 
        PASSWORD_USUARIO: usuario.PASSWORD_USUARIO, CVV: usuario.CVV, MAIL:usuario.MAIL, TELEFONO:usuario.TELEFONO},
        {
            where: {USERNAME: usuario.USERNAME}
        });
    } catch (error) {
        throw new Error('Error al actualizar cliente');
    }
}

const agregarCliente = async (usuario) => {
    console.log(usuario);
    try {
        await Clientedb.create(usuario)
    } catch (error) {
        console.log(error);
        throw new Error('Error al agregar cliente');
    }
}

module.exports = {listarClientes,eliminarCliente,actualizarCliente,buscarCliente,agregarCliente}