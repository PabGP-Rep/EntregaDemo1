const fetch = require('node-fetch');
require('dotenv').config();

async function getProductsCategory(data) {
  try {    
    let {id} = data;
    let url = process.env.CATEGORY_EP + id
    let productos = await fetch(url);
    let dataProductos = await productos.json();
    return dataProductos;
  } catch (error) {
    console.log("Error en el fetch productos");
    throw new Error(error);
  }
}

async function getProductsName(data) {
  try {    
    let {nombre} = data;
    let url = process.env.PRODUCTS_EP + nombre
    let productos = await fetch(url);
    let dataProductos = await productos.json();
    return dataProductos;
  } catch (error) {
    console.log("Error en el fetch productos");
    throw new Error(error);
  }
}

async function getCategories() {
  try {
    let datos = await fetch(process.env.CATEGORIES_EP);
    let data = await datos.json();
    return data;
  }catch (error) {
    console.log("Error en el fetch categorias");
    throw new Error(error);
  }
}

async function getCountries() {
  try {
    let datos = await fetch(process.env.COUNTRIES_EP);
    let data = await datos.json();
    return data;
  }catch (error) {
    console.log("Error en el fetch paises");
    throw new Error(error);
  }
}

module.exports = { getProductsCategory, getProductsName, getCategories, getCountries };