import { Carrito, Cliente } from "../js/clases.js";
import { Conexiones, CRUDCliente } from "./index_conclase.js";


const crearCliente = () =>{
    let cliente = new Cliente;
    cliente.nombre1 = document.getElementById('nombre1').value;
    cliente.nombre2 = document.getElementById('nombre2').value;
    cliente.apellido1 = document.getElementById('apellido1').value;
    cliente.apellido2 = document.getElementById('apellido2').value;
    cliente.username = document.getElementById('username').value;
    cliente.direccion = document.getElementById('direccion').value;
    cliente.envios = document.getElementById('envios').value;
    cliente.pais = document.getElementById('country').value;
    cliente.pago = document.getElementById('OpcionPago').value;
    cliente.propietario = document.getElementById('propietario').value;
    cliente.tarjeta =parseInt( document.getElementById('tarjeta').value,10);
    cliente.caducidad = document.getElementById('caducidad').value; 
    cliente.password = document.getElementById('password').value;
    cliente.cvv = document.getElementById('cvv').value;
    cliente.mail = document.getElementById('mail').value;
    cliente.tel = document.getElementById('telefono').value;
    console.log(cliente);
    return cliente
}

Conexiones.Countries();

document.getElementById('boton-registrar').addEventListener('click',async ()=>{
    let cliente = crearCliente();
    try {
        let resultado = await CRUDCliente.registrar_usuario({PAPEL:'Usuario',NOMBRE1:cliente.nombre1,NOMBRE2:cliente.nombre2,APELLIDO1:cliente.apellido1,
        APELLIDO2:cliente.apellido2,USERNAME:cliente.username,PASSWORD_USUARIO:cliente.password,DIRECCION:cliente.direccion,
        ENVIOS:cliente.envios, PAIS: cliente.pais, FORMA_PAGO: cliente.pago, PROPIETARIO_TARJETA: cliente.propietario,CADUCIDAD:cliente.caducidad, NUM_TARJETA: cliente.tarjeta, PASSWORD_USUARIO: cliente.password, MAIL: cliente.mail, TELEFONO: cliente.tel,CVV: cliente.cvv } )
        alert(resultado);
        let usuariosRegistrados =JSON.parse( window.localStorage.getItem('usuariosEnSistema'));
        let carritosRegistrados = JSON.parse(window.localStorage.getItem('carritosRegistrados'));
        let encontrar = usuariosRegistrados.findIndex((element) => {
            return element.username === cliente.username
        })
        if (encontrar === -1) {
            usuariosRegistrados.push(cliente);
            carritosRegistrados.push(new Carrito(cliente.username));
            window.localStorage.setItem('usuariosEnSistema',JSON.stringify(usuariosRegistrados));
            window.localStorage.setItem('carritosRegistrados',JSON.stringify(carritosRegistrados));
            window.localStorage.setItem('usuarioActivo',JSON.stringify(cliente));
            alert('Bienvenido nuevo usuario');
        }

    } catch (error) {
        console.log(error);
    }

    let usuariosRegistrados =JSON.parse( window.localStorage.getItem('usuariosEnSistema'));
    let carritosRegistrados = JSON.parse(window.localStorage.getItem('carritosRegistrados'));
    let encontrar = usuariosRegistrados.findIndex((element) => {
        return element.username === cliente.username
    })
    if (encontrar===-1) {
        if (checarcliente(cliente)){
            usuariosRegistrados.push(cliente);
            carritosRegistrados.push(new Carrito(cliente.username));
            window.localStorage.setItem('usuariosEnSistema',JSON.stringify(usuariosRegistrados));
            window.localStorage.setItem('carritosRegistrados',JSON.stringify(carritosRegistrados));
            window.localStorage.setItem('usuarioActivo',JSON.stringify(cliente));
            alert('Bienvenido nuevo usuario');
        }else{
            alert('No están llenos los campos')
        }
    }else{
        alert('Nombre de usuario ya registrado')
    }
    
    console.log(usuariosRegistrados);
    console.log(carritosRegistrados);
    console.log(JSON.parse(window.localStorage.getItem('usuarioActivo')));
})


