const Categoria = require('../models/model.categoria');

module.exports.listarCategorias = async () => {
  try {
    const categorias = await Categoria.findAll(); 
    return categorias;    
  } catch (error) {
    throw new Error ({error})
  }
}

module.exports.crearCategoria = async (data) => {
  try {
    const categoria = await Categoria.create({ NOMBRE: data.NOMBRE, IMAGEN: data.IMAGEN});
    console.log("Categoria creada con exito");
    //console.log(categoria);    
    return categoria;
  } catch (error) {
    throw new Error ({error})
  }
}

module.exports.actualizarCategoria = async (data) => {
  try {
    console.log(data);
    await Categoria.update({
      NOMBRE: data.NOMBRE,
      IMAGEN: data.IMAGEN
    },
    {
      where: {
        ID_CATEGORIA: data.ID 
      }
    });  
    console.log("Categoria actualizada con exito");       
    return "Categoria actualizada con exito";
  } catch (error) {
    console.log(er);
    throw new Error ({error})
  }
}

module.exports.eliminarCategoria = async (data) => {
  try {
    await Categoria.destroy({
      where: {
        NOMBRE: data.NOMBRE,
        IMAGEN: data.IMAGEN
      }
    });  
    console.log("Categoria eliminada con exito");       
    return "Categoria eliminada con exito";
  } catch (error) {
    throw new Error ({error})
  }
}