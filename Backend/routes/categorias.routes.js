const categoryController = require('../controller/controller.categoria');

module.exports = (app) => {

  //Solicitud de categorias propias
  app.get('/categ', async (req, res) => {   
    try {      
      let resultado = await categoryController.listarCategorias();
      console.log("Consulta exitosa");
      res.status(200).json(resultado);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  })

  //nueva categoria
  app.post('/categ', async (req, res) => {   
    try {
      let data = req.body;
      let resultado = await categoryController.crearCategoria(data);
      console.log("creado con exito");
      res.status(200).json(resultado);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  })

  //actualizar categoria
  app.put('/categ', async (req, res) => {   
    try {
      let data = req.body;
      let resultado = await categoryController.actualizarCategoria(data);
      console.log("categoria actualizada con exito");
      res.status(200).json(resultado);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  })

  //eliminar categoria
  app.delete('/categ', async (req, res) => {   
    try {
      let data = req.body;
      let resultado = await categoryController.eliminarCategoria(data);
      console.log("eliminado con exito");
      res.status(200).json(resultado);
    } catch (error) {
      return res.status(400).json(error.message)
    }
  })


}
