const { crearProducto, consultarProductos, actualizarProducto, eliminarProducto } = require('../controller/controller.producto');

module.exports = (app) => {

  //Alta de producto
  app.post('/productos', crearProducto);

  //Solicitud de productos
  app.get('/productos', consultarProductos);   

  //actualizar producto
  app.put('/productos', actualizarProducto);

  //eliminar producto
  app.delete('/productos', eliminarProducto);

}
