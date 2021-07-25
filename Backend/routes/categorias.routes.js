const categoryController = require('../controller/controller.categoria');
const {consultarCategorias, crearCategoria, actualizarCategoria, eliminarCategoria} = require('../controller/controller.categoria');

module.exports = (app) => {

  app.post('/categ', crearCategoria);

  app.get('/categ', consultarCategorias);
 
  app.put('/categ', actualizarCategoria);

  app.delete('/categ', eliminarCategoria);

}
