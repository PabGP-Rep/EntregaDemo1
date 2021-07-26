const { clienteDatosEnviados, checarCliente, puedeVerInfo, clienteUsuarioEnviado, clienteExiste } = require("../Midleware/clientes.middlewares");
const { crearCliente, buscarCliente, listarClientes, actualizarCliente, eliminarCliente} = require('../controller/clientes.controlador');

module.exports = (app) =>{

  app.post('/clientes/nuevo', clienteDatosEnviados, clienteExiste, crearCliente);

  app.post('/clientes/miperfil', clienteUsuarioEnviado, checarCliente, buscarCliente);

  app.post('/clientes', clienteUsuarioEnviado, checarCliente, puedeVerInfo, listarClientes);

  app.post('/clientes/actualizar',clienteUsuarioEnviado,checarCliente, actualizarCliente);

  app.post('/clientes/eliminar',clienteUsuarioEnviado,checarCliente, eliminarCliente);      
      
}