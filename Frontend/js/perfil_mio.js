let usuarioActivo = JSON.parse(window.localStorage.getItem('usuarioActivo'));
console.log(usuarioActivo);
document.getElementById('nombre1').textContent = usuarioActivo.nombre1
document.getElementById('nombre2').textContent = usuarioActivo.nombre2;
document.getElementById('apellido1').textContent = usuarioActivo.apellido1;
document.getElementById('apellido2').textContent = usuarioActivo.apellido2;
document.getElementById('username').textContent = usuarioActivo.username;
document.getElementById('direccion').textContent = usuarioActivo.direccion;
document.getElementById('envios').textContent = usuarioActivo.envios;
document.getElementById('country').textContent = usuarioActivo.pais
document.getElementById('OpcionPago').textContent = usuarioActivo.pago;
document.getElementById('propietario').textContent = usuarioActivo.propietario;
document.getElementById('tarjeta').textContent = usuarioActivo.tarjeta;
document.getElementById('caducidad').textContent = usuarioActivo.caducidad;
document.getElementById('cvv').textContent = usuarioActivo.cvv;

document.getElementById('boton_registar_actualizar1').addEventListener('click', ()=>{
    window.open('../index.html','_self')
})