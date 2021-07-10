const express = require('express');
const app = express();
require('dotenv').config();

//Servicios
const { getProductsCategory, getProductsName, getCategories, getCountries } = require('./Services/ml.service.js');
//Middlewares
//const { corsOption, limiter, controlApiKey, chkDatosValidos } = require('./middlewares/index');

//configuración de middlewares globales
app.use(express.json());
//app.use(cors());
app.use(express.urlencoded({ extended: true }));
//app.use(limiter)

/*
app.use((err, req, res, next) => {
  if (err) {
    if (!res.headersSent) {
      return res.status(500).json('error interno del servidor');
    }
  }
  next();
})
*/

//levantamiento del servidor
app.listen(process.env.PORT, ()=> {
    console.log(`Servidor iniciado en http://${process.env.HOST}:${process.env.PORT}`);
})

//EntryPoint
app.get('/', (req, res) => {
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
app.get('/productos_categoria', async (req, res) => {
  try {
    const productos = await getProductsCategory(req.body);
    res.status(200).json(productos);
  } catch (error) {
    return res.status(400).json(error.message)
  }
})

//Solicitud de Productos por Nombre
app.get('/productos_nombre', async (req, res) => {
  try {
    const productos = await getProductsName(req.body);
    res.status(200).json(productos);
  } catch (error) {
    return res.status(400).json(error.message)
  }
})
/*
app.get('/users', cors(corsOption), controlApiKey, (req, res) => {
  try {
    const users = findUsers();
    res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(error.message)
  }
})

app.post('/users', cors(corsOption), controlApiKey, chkDatosValidos, (req, res) => {
  try {
    const users = createUser (req.body);
    return res.status(200).json(users);
  } catch (error) {
    console.log('entre al 2do  catch');
    return res.status(400).json(error.message)
  }
})
*/