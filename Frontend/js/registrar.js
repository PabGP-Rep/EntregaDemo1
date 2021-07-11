import { Carrito, Cliente } from "../js/clases.js";

async function Countries() {
    let country_form = document.getElementById('country');
    
    let countriesList = await fetch('https://api.mercadolibre.com/classified_locations/countries');
    let countriesList_json = await countriesList.json()
    .then((resp) => {
        resp.forEach((element) => {
            let option = document.createElement('option');
            option.textContent = element.name;
            country_form.appendChild(option);          
        });
    })
}

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
    cliente.tarjeta = document.getElementById('tarjeta').value;
    cliente.caducidad = document.getElementById('caducidad').value; 
    cliente.password = document.getElementById('password').value
    cliente.cvv = document.getElementById('cvv').value
    return cliente
}

const checarcliente = (cliente) =>{
    if (cliente.nombre1==="" || cliente.apellido1==="" || cliente.apellido2==="" || cliente.username ==="" || cliente.direccion==="" || cliente.envios==="" || cliente.propietario==="" || cliente.tarjeta==="" || cliente.caducidad==="" ||cliente.password===""||cliente.cvv==="") {
        return false;
    }else{
        return true;
    }
}

document.getElementById('boton_registar_actualizar3').addEventListener('click',()=>{
    let cliente = crearCliente();
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

document.getElementById('boton_registar_actualizar4').addEventListener('click', () =>{
    if(JSON.parse(window.localStorage.getItem('usuarioActivo'))!==null){
        window.open('../index.html','_self');
    }else{
        alert('No se ha registrado correctamente')
    }
})
Countries();


