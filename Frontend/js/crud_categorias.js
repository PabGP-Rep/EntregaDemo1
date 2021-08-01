class Crud{
  constructor(){}

  static async consultarCategorias() {
    let tablaCategorias = document.getElementById('contenido-tabla');
    let url = 'http://localhost:3000/categ';
    let categoryList = await fetch(url);
    let categoryList_json = await categoryList.json();

    let vista = ``;
    categoryList_json.forEach(element => {
      vista += `      
        <tr>
          <th scope="row">${element.ID_CATEGORIA}</th>
          <td>${element.NOMBRE}</td>
          <td>${element.IMAGEN}</td>          
        </tr>    
      `;  
    });
    tablaCategorias.innerHTML = vista;
  }

  static async registrarCategoria(nombre, imagen){  
    try {
      let parametros = { nombre: nombre, imagen: imagen };
      let url = 'http://localhost:3000/categ';
      console.log("registrando con"+ nombre, imagen);
      let agregar = await fetch(url,{
        method:'POST',
        headers: { 
          "Accept": "application/json, text/plain, */*",         
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parametros),
      })
      const agregar_json = agregar.json();
      console.log(agregar_json);
      return agregar_json;
    }catch (error) {
      console.log('nuevo'+error);
    }  
  }

  static async actualizarCategoria(id, nombre, imagen){
    try {
      let parametros = { id: id, nombre: nombre, imagen: imagen };
      let url = 'http://localhost:3000/categ';
      console.log("actualizando con"+id, nombre, imagen);
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

  static async eliminarCategoria(id, nombre, imagen){
    try {
      let parametros = { id: id, nombre: nombre, imagen: imagen };
      let url = 'http://localhost:3000/categ';
      console.log("eliminando con"+id, nombre, imagen);
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
  Crud.consultarCategorias();
});

botonRegistro.addEventListener('click', () => {
  let campoNombre = document.getElementById('nombre1').value;
  let campoImagen = document.getElementById('imagen1').value;
  console.log("consultando");
  try {
    validarTxt(campoNombre);
    Crud.registrarCategoria(campoNombre, campoImagen);
    alert('Categoria Registrada exitosamente');
  } catch (error) {
    console.log(error);
    alert(`Error: ${error.message}`);    
  }  
});

botonActualizar.addEventListener('click', async () => {
  let campoId = document.getElementById('id2').value;
  let campoNombre = document.getElementById('nombre2').value;
  let campoImagen = document.getElementById('imagen2').value;
  console.log("actualizando");
  try {
    validarNumero(campoId);
    await validarCategoriaID(campoId);
    validarTxt(campoNombre);
    Crud.actualizarCategoria(campoId, campoNombre, campoImagen);
    alert('Categoria Actualizada exitosamente');
  } catch (error) {
    console.log(error);
    alert(`Error: ${error.message}`);
  }  
});

botonEliminar.addEventListener('click', async () => {
  let campoId = document.getElementById('id3').value;
  let campoNombre = document.getElementById('nombre3').value;
  let campoImagen = document.getElementById('imagen3').value;
  console.log("eliminando");
  try {
    validarNumero(campoId);
    validarTxt(campoNombre);
    await validarCategoria(campoId, campoNombre, campoImagen);
    Crud.eliminarCategoria(campoId, campoNombre, campoImagen);
    alert('Categoria Eliminada exitosamente');
  } catch (error) {
    console.log(error);
    alert(`Error: ${error.message}`);
  }  
});