class CrudProductos{
  constructor(){}

  static async consultarProductos() {
    let tablaProductos = document.getElementById('contenido-tabla');
    let url = 'http://localhost:3000/productos';
    let productList = await fetch(url);
    let productList_json = await productList.json();

    let vista = ``;
    productList_json.forEach(element => {
      vista += `      
        <tr>
          <th scope="row">${element.ID_PRODUCTO}</th>
          <td>${element.ID_CATEGORIA}</td>
          <td>${element.NOMBRE}</td>
          <td>${element.PRECIO}</td> 
          <td>${element.IMAGEN}</td>         
        </tr>    
      `;  
    });
    tablaProductos.innerHTML = vista;
  }

  static async registrarProducto(idcategoria, nombre, precio, imagen){  
    try {
      let parametros = { idCategoria: idcategoria, nombre: nombre, precio: precio, imagen: imagen };
      let url = 'http://localhost:3000/productos';
      console.log("registrando con"+ idcategoria, nombre, precio, imagen);
      let agregar = await fetch(url,{
        method:'POST',
        headers: { 
          "Accept": "application/json, text/plain, */*",         
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parametros),
      })
      const agregar_json = await agregar.json();
      console.log(agregar_json);
      return agregar_json;
    }catch (error) {
      console.log('nuevo'+error);
    }  
  }

  static async actualizarProducto(idproducto, idcategoria, nombre, precio, imagen){
    try {
      let parametros = { id: idproducto, idCategoria: idcategoria, nombre: nombre, precio: precio, imagen: imagen };
      let url = 'http://localhost:3000/productos';
      console.log("actualizando "+ idproducto+" con"+idcategoria, nombre, precio, imagen);
      let agregar = await fetch(url,{
        method:'PUT',
        headers: { 
          "Accept": "application/json, text/plain, */*",         
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parametros),
      })
      const agregar_json = await agregar.json();
      console.log(agregar_json);
      return agregar_json;
    }catch (error) {
      console.log('nuevo'+error);
    }  
  }

  static async eliminarProducto(idproducto, idcategoria, nombre, precio, imagen){
    try {
      let parametros = { id: idproducto, idCategoria: idcategoria, nombre: nombre, precio: precio, imagen: imagen };
      let url = 'http://localhost:3000/productos';
      console.log("Eliminado "+ idproducto, idcategoria, nombre, precio, imagen);
      let agregar = await fetch(url,{
        method:'DELETE',
        headers: { 
          "Accept": "application/json, text/plain, */*",         
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parametros),
      })
      const agregar_json = await agregar.json();
      console.log(agregar_json);
      return agregar_json;
    }catch (error) {
      console.log('nuevo'+error);
    }  
  }
}

const botonConsulta = document.getElementById('boton-consultar');
const botonRegistro = document.getElementById('boton-registrar');
const botonActualizar = document.getElementById('boton-actualizar');
const botonEliminar = document.getElementById('boton-eliminar');

botonConsulta.addEventListener('click', () => {
  CrudProductos.consultarProductos();
});

botonRegistro.addEventListener('click', async () => {
  let campoIdCategoria = document.getElementById('idcategoria1').value;
  let campoNombre = document.getElementById('nombre1').value;
  let campoPrecio = document.getElementById('precio1').value;
  let campoImagen = document.getElementById('imagen1').value;
  console.log("Registrando");
  try {
    validarNumero(campoIdCategoria);
    await validarCategoriaID(campoIdCategoria);
    validarTxt(campoNombre);
    validarNumeroFloat(campoPrecio);
    CrudProductos.registrarProducto(campoIdCategoria, campoNombre, campoPrecio, campoImagen);
    alert('Producto Registrado exitosamente');
  } catch (error) {
    console.log(error);
    alert(`Error: ${error.message}`);  
  }  
});

botonActualizar.addEventListener('click', async () => {
  let campoIdProducto = document.getElementById('idproducto2').value;
  let campoIdCategoria = document.getElementById('idcategoria2').value;
  let campoNombre = document.getElementById('nombre2').value;
  let campoPrecio = document.getElementById('precio2').value;
  let campoImagen = document.getElementById('imagen2').value;
  console.log("actualizando");
  try {
    validarNumero(campoIdProducto);
    await validarProductoId(campoIdProducto);
    validarNumero(campoIdCategoria);
    await validarCategoriaID(campoIdCategoria);
    validarTxt(campoNombre);
    validarNumeroFloat(campoPrecio);
    CrudProductos.actualizarProducto(campoIdProducto, campoIdCategoria, campoNombre, campoPrecio, campoImagen);  
    alert('Producto Actualizado exitosamente');
  } catch (error) {
    console.log(error);
    alert(`Error: ${error.message}`);  
  }  
});

botonEliminar.addEventListener('click', async () => {
  let campoIdProducto = document.getElementById('idproducto3').value;
  let campoIdCategoria = document.getElementById('idcategoria3').value;
  let campoNombre = document.getElementById('nombre3').value;
  let campoPrecio = document.getElementById('precio3').value;
  let campoImagen = document.getElementById('imagen3').value;
  console.log("eliminando");
  try {
    validarNumero(campoIdProducto);    
    validarNumero(campoIdCategoria);
    validarTxt(campoNombre);
    validarNumeroFloat(campoPrecio);
    await validarProducto(campoIdProducto, campoIdCategoria, campoNombre, campoPrecio, campoImagen);
    CrudProductos.eliminarProducto(campoIdProducto, campoIdCategoria, campoNombre, campoPrecio, campoImagen);
    alert('Producto Eliminado exitosamente');
  } catch (error) {
    console.log(error);
    alert(`Error: ${error.message}`);    
  }
  
});