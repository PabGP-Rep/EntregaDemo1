import { Cliente } from "./clases.js";
import { CRUDCliente } from "./index_conclase.js";


let usuarioActivo = JSON.parse(window.localStorage.getItem('usuarioActivo'));
console.log(usuarioActivo);
document.getElementById('nombre1').value = usuarioActivo.nombre1
document.getElementById('nombre2').value = usuarioActivo.nombre2;
document.getElementById('apellido1').value = usuarioActivo.apellido1;
document.getElementById('apellido2').value = usuarioActivo.apellido2;
document.getElementById('username').value = usuarioActivo.username;
document.getElementById('password').value = usuarioActivo.password;
document.getElementById('direccion').value = usuarioActivo.direccion;
document.getElementById('envios').value = usuarioActivo.envios;
document.getElementById('country').value = usuarioActivo.pais
document.getElementById('OpcionPago').value = usuarioActivo.pago;
document.getElementById('propietario').value = usuarioActivo.propietario;
document.getElementById('tarjeta').value = usuarioActivo.tarjeta;
document.getElementById('caducidad').value = usuarioActivo.caducidad;
document.getElementById('cvv').value = usuarioActivo.cvv;

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

document.getElementById('boton-actualizar').addEventListener('click', async ()=>{
    try {
        let cliente = crearCliente();
        let resultado = await CRUDCliente.actualizar_usuario({PAPEL:'Usuario',NOMBRE1:cliente.nombre1,NOMBRE2:cliente.nombre2,APELLIDO1:cliente.apellido1,
        APELLIDO2:cliente.apellido2,USERNAME:cliente.username,PASSWORD_USUARIO:cliente.password,DIRECCION:cliente.direccion,
        ENVIOS:cliente.envios, PAIS: cliente.pais, FORMA_PAGO: cliente.pago, PROPIETARIO_TARJETA: cliente.propietario,CADUCIDAD:cliente.caducidad, NUM_TARJETA: cliente.tarjeta, PASSWORD_USUARIO: cliente.password, MAIL: cliente.mail, TELEFONO: cliente.tel,CVV: cliente.cvv } )
        alert(resultado);
    } catch (error) {
        console.log(error);
    }
    
})

document.getElementById('boton-eliminar').addEventListener('click',async ()=>{
    try {
        let resultado = await CRUDCliente.borrar_usuario({USERNAME:document.getElementById('username').value,PASSWORD_USUARIO:document.getElementById('password').value});
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})