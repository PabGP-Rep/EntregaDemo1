const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

//Rutas
const mlRoute = require('./routes/ml.routes');

//configuración de middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//levantamiento del servidor
app.listen(process.env.PORT, ()=> {
    console.log(process.env.PORT);
    console.log(`Servidor iniciado en http://${process.env.HOST}:${process.env.PORT}`);
})

mlRoute(app);