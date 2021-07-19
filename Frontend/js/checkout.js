import {estiloTarjeta,AgregarProducto,eliminarProducto} from './index.js'
let estilos_ = new estiloTarjeta;
let usuarioActivo = JSON.parse(window.localStorage.getItem('carritoActivo'));
console.log(usuarioActivo);
let productos = usuarioActivo.lista;
let total = usuarioActivo.total;
let estilos = {
    fila: "display:flex;flex-direction:row;justify-content:flex-start;border-bottom:1px solid black; margin-right: 10px ; font-size:50opx"
}
productos.forEach(element => {
    let fila = document.createElement('tr');
    let formato = document.createElement('form');
    formato.setAttribute('style','border:black')
    let producto= document.createElement('input');
    producto.setAttribute('type','text');
    producto.setAttribute('value',element.nombre);
    let precio = document.createElement('input');
    precio.textContent = "$"+element.total
    let cantidad = document.createElement('input');
    cantidad.textContent = element.cantidad;
    let botonmas = document.createElement('button');
    botonmas.setAttribute('style',estilos_.boton+'width:50px');
    botonmas.textContent = '+';
    botonmas.addEventListener('click',()=>{
        AgregarProducto(element);
        element.total = element.precio*(element.cantidad+1);
        cantidad.textContent=element.cantidad;
        location.reload();
    })
    let botonmenos = document.createElement('button');
    botonmenos.setAttribute('style',estilos_.boton+'width:50px')
    botonmenos.textContent = '-';
    botonmenos.addEventListener('click',()=>{
        eliminarProducto(element);
        element.total = element.precio*(element.cantidad+1);
        cantidad.textContent = element.cantidad;
        location.reload();
    })
    formato.appendChild(producto);
    formato.appendChild(precio);
    fila.appendChild(formato);
    document.getElementById('tabla_checkout').appendChild(fila);
})
document.getElementById('imprimir').addEventListener('click',()=>{
    window.print();
})

document.getElementById('pagar_factura').addEventListener('clic',()=>{
    alert('tu pago se ha efectuado');
})
document.getElementById('total').textContent ='TOTAL: $' +Math.round( usuarioActivo.total*100)/100