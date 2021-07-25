const productController = require('../controller/controller.producto');

module.exports = (app) => {

   //Solicitud de productos
   app.get('/productos', async (req, res) => {
    try {      
      let resultado = await productController.listarProductos();
      console.log("Consulta productos exitosa");
      res.status(200).json(resultado);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  });

   //Alta de producto
   app.post('/productos', async (req, res) => {
    try {
      let data = req.body;
      let resultado = await productController.crearProducto(data);
      console.log("alta de producto exitosa");
      res.status(200).json(resultado);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  });

  //actualizar producto
  app.put('/productos', async (req, res) => {
    try {
      let data = req.body;
      let resultado = await productController.actualizarProducto(data);
      console.log("Producto actualizado con exito");
      res.status(200).json(resultado);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  })

  //eliminar producto
  app.delete('/productos', async (req, res) => {   
    try {
      let data = req.body;
      let resultado = await productController.eliminarProducto(data);
      console.log("Producto eliminado con exito");
      res.status(200).json(resultado);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  })

}
