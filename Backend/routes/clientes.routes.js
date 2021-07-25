const { listarClientes,eliminarCliente,buscarCliente,actualizarCliente,agregarCliente } = require("../controllers/clientes.controlador");
const { clienteDatosEnviados,checarCliente,puedeVerInfo,clienteUsuarioEnviado,clienteExiste } = require("../Midleware/clientes.middleware");
module.exports = (app) =>{
    app.post('/clientes',clienteUsuarioEnviado,checarCliente,puedeVerInfo, async (req,res) =>{
        try {
          let resultado = await listarClientes();
          res.json(resultado)
        } catch (error) {
          console.log('ha habido un error',error);
          res.json('ha habido un error grave')
        }
      })
      
      app.post('/clientes/miperfil',clienteUsuarioEnviado,checarCliente,async(req,res) =>{
        try {
          let resultado  =await buscarCliente(req.body);
          res.status(200).json(resultado);
        } catch (error) {
          res.status(400).json(error.message);
        }
      })
      
      
      app.post('/clientes/nuevo',clienteDatosEnviados,clienteExiste,async (req,res)=>{
        try {
          let resultado = await agregarCliente(req.body);
          res.status(200).json('Usuario agregado con exito');
        } catch (error) {
          res.status(400).json(error.message);
        }
      })
      
      
      app.post('/clientes/eliminar',clienteUsuarioEnviado,checarCliente, async (req,res) =>{
        try {
          let resultado = await eliminarCliente(req.body);
          res.status(200).json('Usuario eliminado con exito')
        } catch (error) {
          res.status(400).json(error.message);
        }
      }) 
      
      app.post('/clientes/actualizar',clienteUsuarioEnviado,checarCliente,async(req,res) =>{
        try {
          let resultado = await actualizarCliente(req.body);
          res.status(200).json('Usuario actualizado con exito');
        } catch (error) {
          res.status(400).json(error.message);
        }
      })
}