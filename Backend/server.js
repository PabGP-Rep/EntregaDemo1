const express = require('express');
const app = express();
require('dotenv').config();

//Servicios
const { getProductsCategory, getProductsName, getCategories, getCountries } = require('./Services/ml.service.js');

const cors = require('cors');

//Middlewares
const { limiter, validacionDatos, corsOptions} = require('../Backend/Midleware/index');

//configuración de middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//app.use(limiter)


app.use((err, req, res, next) => {
  if (err) {
    if (!res.headersSent) {
      return res.status(500).json('error interno del servidor');
    }
  }
  next();
})

//levantamiento del servidor
app.listen(process.env.PORT, ()=> {
    console.log(`Servidor iniciado en http://${process.env.HOST}:${process.env.PORT}`);
})

//EntryPoint
app.get('/', cors(corsOptions), (req, res) => {
  res.status(200).json({
    message: 'Hola mundo desde API'
  }) 
})

//Solicitud de Categorias
app.get('/categorias', async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json(error.message)
  }
})

//Solicitud de Paises
app.get('/paises', async (req, res) => {
  try {
    const countries = await getCountries();
    res.status(200).json(countries);
  } catch (error) {
    return res.status(400).json(error.message)
  }
})

//Solicitud de Productos por Categoria
app.post('/productos_categoria', async (req, res) => {
  try {
    //console.log(req.body);
    const productos = await getProductsCategory(req.body);
    res.status(200).json(productos);
  } catch (error) {
    return res.status(400).json(error.message)
  }
})

//Solicitud de Productos por Nombre
app.post('/productos_nombre', validacionDatos, async (req, res) => {
  try {
    //console.log(req.body);
    const productos = await getProductsName(req.body);
    res.status(200).json(productos);
  } catch (error) {
    return res.status(400).json(error.message)
  }
})