CREATE DATABASE MITIENDITA
USE MITIENDITA
​
CREATE TABLE CLIENTES (ID_CLIENTE_SERIE INT NOT NULL IDENTITY(1,1), PAPEL VARCHAR(100) NOT NULL, 
NOMBRE1 VARCHAR(100) NOT NULL, NOMBRE2 VARCHAR(100) NOT NULL, APELLIDO1 VARCHAR(100) NOT NULL, 
APELLIDO2 VARCHAR(100) NOT NULL, USERNAME VARCHAR(50) NOT NULL, DIRECCION VARCHAR(500) NOT NULL, ENVIOS VARCHAR(500) NOT NULL,
PAIS VARCHAR(50) NOT NULL, FORMA_PAGO VARCHAR(50) NOT NULL, PROPIETARIO_TARJETA VARCHAR(500) NOT NULL, NUM_TARJETA INT NOT NULL,
CADUCIDAD DATE NOT NULL, PASSWORD_USUARIO VARCHAR(100) NOT NULL, CVV VARCHAR(30) NOT NULL, MAIL VARCHAR(200) NOT NULL, 
TELEFONO VARCHAR(200) NOT NULL, PRIMARY KEY(USERNAME))
​
CREATE TABLE PEDIDOS(ID_PEDIDO INT NOT NULL IDENTITY(1,1), USERNAME VARCHAR(50) NOT NULL, TOTAL FLOAT NOT NULL, PAGADO BIT NOT NULL,
ENVIADO BIT NOT NULL, RECIBIDO BIT NOT NULL, PRIMARY KEY(ID_PEDIDO), FOREIGN KEY(USERNAME) REFERENCES CLIENTES)
​
CREATE TABLE CATEGORIAS(ID_CATEGORIA INT NOT NULL IDENTITY(1,1), NOMBRE VARCHAR(100) NOT NULL, IMAGEN VARCHAR(1000), PRIMARY KEY(ID_CATEGORIA))
​
CREATE TABLE PRODUCTOS(ID_PRODUCTO INT NOT NULL IDENTITY (1,1), ID_CATEGORIA INT NOT NULL, 
NOMBRE VARCHAR(500) NOT NULL, PRECIO FLOAT NOT NULL,  IMAGEN VARCHAR(1000), PRIMARY KEY(ID_PRODUCTO), FOREIGN KEY(ID_CATEGORIA) REFERENCES
CATEGORIAS)