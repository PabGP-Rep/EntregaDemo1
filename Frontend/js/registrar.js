import { Carrito, Cliente } from "../js/clases.js";
import { Conexiones, CRUDCliente, Storage } from "./index_conclase.js";


Conexiones.Countries();

document.getElementById('boton-registrar').addEventListener('click',async ()=>{
    let cliente = Storage.crearCliente();
    /*try {
        let resultado = await CRUDCliente.registrar_usuario({PAPEL:'Usuario',NOMBRE1:cliente.nombre1,NOMBRE2:cliente.nombre2,APELLIDO1:cliente.apellido1,
        APELLIDO2:cliente.apellido2,USERNAME:cliente.username,PASSWORD_USUARIO:cliente.password,DIRECCION:cliente.direccion,
        ENVIOS:cliente.envios, PAIS: cliente.pais, FORMA_PAGO: cliente.pago, PROPIETARIO_TARJETA: cliente.propietario,CADUCIDAD:cliente.caducidad, NUM_TARJETA: cliente.tarjeta, PASSWORD_USUARIO: cliente.password, MAIL: cliente.mail, TELEFONO: cliente.tel,CVV: cliente.cvv } )
        alert(resultado);
        let usuario = localStorage.setItem('usuarioActivo',JSON.stringify())
    } catch (error) {
        console.log(error);
    }*/
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
    

})


