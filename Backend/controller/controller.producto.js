const Producto = require('../models/model.producto');

module.exports.listarProductos = async () => {
  try {
    const productos = await Producto.findAll();   
    return productos;    
  } catch (error) {
    throw new Error ({error})
  }
}

module.exports.crearProducto = async (data) => {
  try {
    const producto = await Producto.create({ 
      ID_CATEGORIA: data.ID_CATEGORIA,
      NOMBRE: data.NOMBRE,
      PRECIO: data.PRECIO,
      IMAGEN: data.IMAGEN
    });
    console.log("Producto creado con exito");     
    return producto;
  } catch (error) {
    throw new Error ({error})
  }
}

module.exports.actualizarProducto = async (data) => {
  try {
    console.log(data);
    await Producto.update({
      ID_CATEGORIA: data.ID_CATEGORIA,
      NOMBRE: data.NOMBRE,
      PRECIO: data.PRECIO,
      IMAGEN: data.IMAGEN
    },
    {
      where: {
        ID_PRODUCTO: data.ID 
      }
    });  
    console.log("Producto actualizado con exito");       
    return "Producto actualizado con exito";
  } catch (error) {
    console.log(error);
    throw new Error ({error})
  }
}

module.exports.eliminarProducto = async (data) => {
  try {
    await Producto.destroy({
      where: {
        ID_CATEGORIA: data.ID_CATEGORIA,
        NOMBRE: data.NOMBRE,
        PRECIO: data.PRECIO,
        IMAGEN: data.IMAGEN
      }
    });  
    console.log("Producto eliminado con exito"); 
    return "Producto eliminado con exito";
  } catch (error) {
    throw new Error ({error})
  }
}