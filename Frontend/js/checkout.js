let usuarioActivo = JSON.parse(window.localStorage.getItem('carritoActivo'));
console.log(usuarioActivo);
let productos = usuarioActivo.lista;
let total = usuarioActivo.total;
let estilos = {
    fila: "display:flex;flex-direction:row;justify-content:flex-start;border-bottom:1px solid black; margin-right: 10px "
}
productos.forEach(element => {
    let fila = document.createElement('tr');
    let producto = document.createElement('th');
    producto.setAttribute('style', estilos.fila)
    producto.textContent = element.nombre;
    let precio = document.createElement('th');
    precio.textContent = "$"+element.total
    let cantidad = document.createElement('th');
    cantidad.textContent = element.cantidad
    fila.appendChild(producto);
    fila.appendChild(cantidad);
    fila.appendChild(precio);
    document.getElementById('tabla_checkout').appendChild(fila);
})

document.getElementById('imprimir').addEventListener('click',()=>{
    window.print();
})

document.getElementById('pagar_factura').addEventListener('clic',()=>{
    alert('tu pago se ha efectuado');
})
document.getElementById('total').textContent ='TOTAL: $' +Math.round( usuarioActivo.total*100)/100