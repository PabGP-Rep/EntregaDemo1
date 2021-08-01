function validarTxt(data){
  if (data == null || data == 0 || /^\s+$/.test(data)) {
    throw new Error('Alguno de los valores ingresados es incorrecto');    
  } else {
    return 'ok';    
  }
}

function validarNumero(data){
  if (data == null || data == 0 || !(/^[0-9]+$/.test(data))) {
    throw new Error('Alguno de los valores ingresados no es un numero entero');  
  } else {
    return 'ok';    
  }
}

function validarNumeroFloat(data){
  if (data == null || data == 0 || !(/^([0-9]*[.])?[0-9]+$/.test(data))) {
    throw new Error('Alguno de los valores ingresados no es un numero flotante'); 
  } else {
    return 'ok';    
  }
}

async function validarCategoriaID(id){
  let flag = 0;
  let url = 'http://localhost:3000/categ';
  let categoryList = await fetch(url);
  let categoryList_json = await categoryList.json();
  console.log(categoryList_json);
  categoryList_json.forEach(element => {
    if(element.ID_CATEGORIA == id){
      flag = 1;
    }
  });
  console.log(flag);
  if (flag === 0)
    throw new Error('No existe tal categoria');
}

async function validarCategoria(id, nombre, imagen ){
  let flag = 0;
  let url = 'http://localhost:3000/categ';
  let categoryList = await fetch(url);
  let categoryList_json = await categoryList.json();
  console.log(categoryList_json);
  categoryList_json.forEach(element => {
    if(element.ID_CATEGORIA == id && element.NOMBRE == nombre && element.IMAGEN == imagen){
      flag = 1;
    }
  });
  console.log(flag);
  if (flag === 0)
    throw new Error('No existe tal categoria');
}

async function validarProductoId(idproducto){
  let flag = 0;
  let url = 'http://localhost:3000/productos';
  let productList = await fetch(url);
  let productList_json = await productList.json();
  productList_json.forEach(element => {
    if(element.ID_PRODUCTO == idproducto){
      flag = 1;
    }
  });
  console.log(flag);
  if (flag === 0)
    throw new Error('No existe tal Id de producto');
}

async function validarProducto(idproducto, idcategoria, nombre, precio, imagen){
  let flag = 0;
  let url = 'http://localhost:3000/productos';
  let productList = await fetch(url);
  let productList_json = await productList.json();
  productList_json.forEach(element => {
    if(element.ID_PRODUCTO == idproducto && element.ID_CATEGORIA == idcategoria && element.NOMBRE == nombre && element.PRECIO == precio && element.IMAGEN == imagen){
      flag = 1;
    }
  });
  console.log(flag);
  if (flag === 0)
    throw new Error('No existe tal producto');
}